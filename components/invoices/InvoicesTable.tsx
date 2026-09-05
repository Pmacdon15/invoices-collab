"use client";

import { Edit, Printer, Trash2 } from "lucide-react";
import type { InvoicesTableProps } from "@/types/types";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function InvoicesTable({
  invoices,
  clients,
  onEditInvoice,
  onUpdateStatus,
  onPrintInvoice,
}: InvoicesTableProps) {
  return (
    <div className="rounded-md border bg-white">
      {/* Mobile View */}
      <div className="block md:hidden divide-y">
        {invoices.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No invoices found.
          </div>
        ) : (
          invoices.map((invoice) => {
            const client = clients.find((c) => c.id === invoice.clientId);
            return (
              <div key={invoice.id} className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {invoice.id?.substring(0, 8)}...
                    </p>
                    <p className="text-sm text-gray-500">
                      {client ? client.name : "Unknown Client"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPrintInvoice?.(invoice)}
                    >
                      <Printer className="h-3.5 w-3.5 mr-1" />
                      Print
                    </Button>
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
                </div>

                <div className="flex items-center justify-between">
                  <Select
                    value={invoice.status}
                    onValueChange={(val) =>
                      onUpdateStatus(
                        invoice,
                        val as "draft" | "sent" | "paid" | "overdue",
                      )
                    }
                  >
                    <SelectTrigger className="h-7 w-[110px] rounded-full border-none bg-blue-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-blue-800 focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>

                  <p className="text-lg font-bold">${invoice.amount}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Created At:{" "}
                    {invoice.createdAt
                      ? new Date(invoice.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop View */}
      <table className="hidden md:table w-full text-sm">
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
                    <Select
                      value={invoice.status}
                      onValueChange={(val) =>
                        onUpdateStatus(
                          invoice,
                          val as "draft" | "sent" | "paid" | "overdue",
                        )
                      }
                    >
                      <SelectTrigger className="h-7 w-[110px] rounded-full border-none bg-blue-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-blue-800 focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-gray-500">
                    {invoice.createdAt
                      ? new Date(invoice.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPrintInvoice?.(invoice)}
                      >
                        <Printer />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditInvoice(invoice)}
                        title="Edit Invoice"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        title="Delete Invoice"
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
