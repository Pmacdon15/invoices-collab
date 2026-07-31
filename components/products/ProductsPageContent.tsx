"use client";

import { startTransition, use, useOptimistic, useState } from "react";
import type { DataFetchResponse } from "../../dal/clients";
import type { Product } from "../../db/schema";
import { useProductMutations } from "../../mutations/useProductMutations";
import { Pagination } from "../Pagination";
import { Button } from "../ui/button";
import { AddProductDialog } from "./AddProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { ProductsTable } from "./ProductsTable";

export function ProductsPageContent({
  productsPromise,
}: {
  productsPromise: Promise<
    DataFetchResponse<{
      products: Product[];
      totalPages: number;
    }>
  >;
}) {
  const { data, reason } = use(productsPromise);
  const initialProducts = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    initialProducts,
    (state, action: { type: "add" | "edit"; product: Product }) => {
      if (action.type === "add") {
        return [...state, action.product];
      }
      if (action.type === "edit") {
        return state.map((c) =>
          c.id === action.product.id ? action.product : c,
        );
      }
      return state;
    },
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { addMutation, editMutation } = useProductMutations({
    onAddSuccess: () => setIsAddOpen(false),
    onEditSuccess: () => setEditingProduct(null),
  });

  const handleAdd = (newData: Product) => {
    startTransition(() => {
      setOptimisticProducts({
        type: "add",
        product: { ...newData, id: crypto.randomUUID() },
      });
    });
    addMutation.mutate(newData);
  };

  const handleEdit = (newData: Product) => {
    if (!editingProduct?.id) return;
    startTransition(() => {
      setOptimisticProducts({
        type: "edit",
        product: { ...newData, id: editingProduct.id },
      });
    });
    editMutation.mutate({ id: editingProduct.id, updates: newData });
  };

  if (reason) {
    return (
      <div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
        <p className="text-red-500 font-medium bg-red-50 p-4 rounded-md">
          Error: {reason}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Products & Services
        </h1>
        <Button onClick={() => setIsAddOpen(true)}>Add Product</Button>
      </div>
      {reason ? (
        <div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
          <p className="text-red-500 font-medium bg-red-50 p-4 rounded-md">
            Error: {reason}
          </p>
        </div>
      ) : (
        <>
          <ProductsTable
            products={optimisticProducts}
            onEditProduct={setEditingProduct}
          />
          <Pagination totalPages={totalPages} />
        </>
      )}

      <AddProductDialog
        onOpenChange={setIsAddOpen}
        onSubmit={handleAdd}
        open={isAddOpen}
      />

      <EditProductDialog
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEdit}
      />
    </>
  );
}
