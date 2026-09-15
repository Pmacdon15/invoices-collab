"use client";

import { FileDown, Loader2, Printer } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import type { Client, Invoice, InvoiceItem, Product } from "../../db/schema";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface PrintInvoiceDialogProps {
  invoice: Invoice | null;
  onClose: () => void;
  clients: Client[];
  products: Product[];
}

function InvoiceDocument({
  id,
  invoice,
  client,
  items,
  products,
  isPaid,
  statusLabel,
}: {
  id?: string;
  invoice: Invoice;
  client: Client | undefined;
  items: InvoiceItem[];
  products: Product[];
  isPaid: boolean;
  statusLabel: string;
}) {
  return (
    <div
      id={id}
      className="bg-white text-zinc-900 p-6 rounded-lg border border-zinc-200 print:border-none print:p-0 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b pb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div>
            <h2 className="text-xl font-bold tracking-tight">VivaPro</h2>
            <p className="text-xs text-gray-500">Invoice</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Invoice #
          </p>
          <p className="font-mono text-sm font-bold text-gray-800">
            {invoice.id?.substring(0, 8)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Date:{" "}
            {invoice.createdAt
              ? new Date(invoice.createdAt).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Bill To & Status */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Bill To:
          </p>
          <p className="text-base font-bold text-gray-900">
            {client ? client.name : "Unknown Client"}
          </p>
          {client?.email && (
            <p className="text-sm text-gray-600">{client.email}</p>
          )}
          {client?.phone && (
            <p className="text-sm text-gray-600">{client.phone}</p>
          )}
          {client?.address && (
            <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
              {client.address}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Status:
          </p>
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isPaid
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-amber-100 text-amber-800 border border-amber-200"
              }`}
            >
              {statusLabel}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Payment Status:{" "}
            <span className="font-semibold text-gray-900">
              {isPaid ? "Paid" : "Pending"}
            </span>
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b">
            <tr className="text-left">
              <th className="p-3 font-medium">Item</th>
              <th className="p-3 font-medium text-center">Qty</th>
              <th className="p-3 font-medium text-right">Price</th>
              <th className="p-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No items found on this invoice.
                </td>
              </tr>
            ) : (
              items.map((item, idx) => {
                const product = products.find((p) => p.id === item.productId);
                const unitPrice = product?.price
                  ? parseFloat(product.price)
                  : item.quantity > 0
                    ? parseFloat(item.amount || "0") / item.quantity
                    : 0;

                return (
                  <tr key={item.id || idx}>
                    <td className="p-3">
                      <p className="font-medium text-gray-900">
                        {product ? product.name : "Unknown Item"}
                      </p>
                      {product?.description && (
                        <p className="text-xs text-gray-500">
                          {product.description}
                        </p>
                      )}
                      {product?.sku && (
                        <p className="text-xs text-gray-400">
                          SKU: {product.sku}
                        </p>
                      )}
                    </td>
                    <td className="p-3 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="p-3 text-right text-gray-700">
                      ${unitPrice.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-medium text-gray-900">
                      ${parseFloat(item.amount || "0").toFixed(2)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-end pt-2">
        <div className="w-64 space-y-2 text-right">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal:</span>
            <span>${parseFloat(invoice.amount || "0").toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base font-bold text-gray-900">
            <span>Total Amount:</span>
            <span>${parseFloat(invoice.amount || "0").toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrintInvoiceDialog({
  invoice,
  onClose,
  clients,
  products,
}: PrintInvoiceDialogProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!invoice) return null;

  const client = clients.find((c) => c.id === invoice.clientId);

  const items: InvoiceItem[] = Array.isArray(invoice.items)
    ? invoice.items
    : typeof invoice.items === "string"
      ? JSON.parse(invoice.items)
      : [];

  const isPaid = invoice.status === "paid";
  const statusLabel = isPaid ? "Paid" : `Pending (${invoice.status})`;

  const triggerPrint = () => {
    const originalTitle = document.title;
    const invoiceNumber = invoice.id?.substring(0, 8) || "invoice";
    document.title = `Invoice-${invoiceNumber}`;

    const cleanup = () => {
      document.title = originalTitle;
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
    setTimeout(cleanup, 1000);
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById("invoice-document-card");
    if (!element) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const printWidth = pdfWidth - margin * 2;
      const printHeight = (imgProps.height * printWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", margin, margin, printWidth, printHeight);
      const invoiceNumber = invoice.id?.substring(0, 8) || "invoice";
      pdf.save(`Invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF directly:", error);
      triggerPrint();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Dialog open={!!invoice} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="no-print">
            <DialogTitle>Print Invoice</DialogTitle>
          </DialogHeader>

          <InvoiceDocument
            id="invoice-document-card"
            invoice={invoice}
            client={client}
            items={items}
            products={products}
            isPaid={isPaid}
            statusLabel={statusLabel}
          />

          {/* Modal Actions */}
          <div className="no-print flex items-center justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Close
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              type="button"
              className="gap-2"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </Button>
            <Button onClick={triggerPrint} type="button" className="gap-2">
              <Printer className="w-4 h-4" />
              Print Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Print-only portal placed directly into document.body */}
      {isMounted &&
        createPortal(
          <div id="invoice-print-container" className="hidden print:block">
            <InvoiceDocument
              invoice={invoice}
              client={client}
              items={items}
              products={products}
              isPaid={isPaid}
              statusLabel={statusLabel}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
