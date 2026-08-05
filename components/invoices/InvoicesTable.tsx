"use client";

import { Edit, Trash2 } from "lucide-react";
import type { Client, Invoice, Product } from "../../db/schema";
import { Button } from "../ui/button";

interface InvoicesTableProps {
  invoices: Invoice[];
  clients: Client[];
  products: Product[];
  onEditInvoice: (invoice: Invoice) => void;
}

export function InvoicesTable({
  invoices,
  clients,
  products,
  onEditInvoice,
}: InvoicesTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50/50">
          <tr className="text-left text-gray-500">
            <th className="p-4 font-medium">Invoice ID</th>
            <th className="p-4 font-medium">Client</th>
            <th className="p-4 font-medium">Amount</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Created At</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-8 text-center text-gray-500">
                No invoices found.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => {
              const client = clients.find((c) => c.id === invoice.clientId);
              return (
                <tr
                  key={invoice.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="p-4 font-medium">
                    {invoice.id?.substring(0, 8)}...
                  </td>
                  <td className="p-4">
                    {client ? client.name : "Unknown Client"}
                  </td>
                  <td className="p-4">${invoice.amount}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize bg-blue-100 text-blue-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    {invoice.createdAt
                      ? new Date(invoice.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditInvoice(invoice)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
