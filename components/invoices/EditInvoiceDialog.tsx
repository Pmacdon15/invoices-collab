import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { InvoiceForm } from "./InvoiceForm";
import type { Invoice, InvoiceFormValues, Client, Product } from "../../db/schema";

interface EditInvoiceDialogProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSubmit: (values: InvoiceFormValues) => Promise<void> | void;
  clients: Client[];
  products: Product[];
}

export function EditInvoiceDialog({
  invoice,
  onClose,
  onSubmit,
  clients,
  products,
}: EditInvoiceDialogProps) {
  return (
    <Dialog open={!!invoice} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
        </DialogHeader>
        {invoice && (
          <InvoiceForm
            clients={clients}
            products={products}
            initialData={invoice as InvoiceFormValues}
            onCancel={onClose}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
