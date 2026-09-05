import type { Client, Invoice } from "@/db/schema";

export interface InvoicesTableProps {
  invoices: Invoice[];
  clients: Client[];
  onEditInvoice: (invoice: Invoice) => void;
  onUpdateStatus: (invoice: Invoice, newStatus: Invoice["status"]) => void;
  onPrintInvoice?: (invoice: Invoice) => void;
}
