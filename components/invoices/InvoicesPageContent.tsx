"use client";

import { startTransition, use, useOptimistic, useState } from "react";
import type { DataFetchResponse } from "../../dal/clients";
import type { Client, Invoice, Product } from "../../db/schema";
import { useInvoiceMutations } from "../../mutations/useInvoiceMutations";
import { Pagination } from "../Pagination";
import { Button } from "../ui/button";
import { AddInvoiceDialog } from "./AddInvoiceDialog";
import { EditInvoiceDialog } from "./EditInvoiceDialog";
import { InvoicesTable } from "./InvoicesTable";

export function InvoicesPageContent({
  invoicesPromise,
  clientsPromise,
  productsPromise,
}: {
  invoicesPromise: Promise<
    DataFetchResponse<{
      invoices: Invoice[];
      totalPages: number;
    }>
  >;
  clientsPromise: Promise<
    DataFetchResponse<{
      clients: Client[];
      totalPages: number;
    }>
  >;
  productsPromise: Promise<
    DataFetchResponse<{
      products: Product[];
      totalPages: number;
    }>
  >;
}) {
  const { data, reason } = use(invoicesPromise);
  const { data: clientsData } = use(clientsPromise);
  const { data: productsData } = use(productsPromise);

  const initialInvoices = data?.invoices || [];
  const totalPages = data?.totalPages || 1;
  const clients = clientsData?.clients || [];
  const products = productsData?.products || []; 

  const [optimisticInvoices, setOptimisticInvoices] = useOptimistic(
    initialInvoices,
    (state, action: { type: "add" | "edit"; invoice: Invoice }) => {
      if (action.type === "add") {
        return [...state, action.invoice];
      }
      if (action.type === "edit") {
        return state.map((c) =>
          c.id === action.invoice.id ? action.invoice : c,
        );
      }
      return state;
    },
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const { addMutation, editMutation } = useInvoiceMutations({
    onAddSuccess: () => setIsAddOpen(false),
    onEditSuccess: () => setEditingInvoice(null),
  });

  const handleAdd = (newData: Invoice) => {
    startTransition(() => {
      setOptimisticInvoices({
        type: "add",
        invoice: { ...newData, id: crypto.randomUUID() },
      });
    });
    addMutation.mutate(newData);
  };

  const handleEdit = (newData: Invoice) => {
    if (!editingInvoice?.id) return;
    startTransition(() => {
      setOptimisticInvoices({
        type: "edit",
        invoice: { ...newData, id: editingInvoice.id },
      });
    });
    editMutation.mutate({ id: editingInvoice.id, updates: newData });
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
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Button onClick={() => setIsAddOpen(true)}>Create Invoice</Button>
      </div>
      {reason ? (
        <div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
          <p className="text-red-500 font-medium bg-red-50 p-4 rounded-md">
            Error: {reason}
          </p>
        </div>
      ) : (
        <>
          <InvoicesTable
            invoices={optimisticInvoices}
            clients={clients}
            onEditInvoice={setEditingInvoice}
          />
          <Pagination totalPages={totalPages} />
        </>
      )}

      <AddInvoiceDialog
        onOpenChange={setIsAddOpen}
        onSubmit={handleAdd}
        open={isAddOpen}
        clients={clients}
        products={products}
      />

      <EditInvoiceDialog
        invoice={editingInvoice}
        onClose={() => setEditingInvoice(null)}
        onSubmit={handleEdit}
        clients={clients}
        products={products}
      />
    </>
  );
}
