"use client";

import type { Product } from "../../db/schema";
import { Button } from "../ui/button";

export interface ProductsDesktopTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
}

export function ProductsDesktopTable({
  products,
  onEditProduct,
}: ProductsDesktopTableProps) {
  return (
    <table className="hidden md:table w-full text-left text-sm">
      <thead className="bg-zinc-50 font-medium text-zinc-500">
        <tr>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Description</th>
          <th className="px-6 py-4">Price</th>
          <th className="px-6 py-4">SKU</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200 bg-white">
        {products.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
              No products found. Add one to get started.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id} className="hover:bg-zinc-50/50">
              <td className="px-6 py-4 font-medium text-zinc-900">
                {product.name}
              </td>
              <td className="px-6 py-4 text-zinc-500 truncate max-w-[200px]">
                {product.description || "-"}
              </td>
              <td className="px-6 py-4 text-zinc-500">
                {product.price || "-"}
              </td>
              <td className="px-6 py-4 text-zinc-500">
                {product.sku || "-"}
              </td>
              <td className="px-6 py-4 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditProduct(product)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
