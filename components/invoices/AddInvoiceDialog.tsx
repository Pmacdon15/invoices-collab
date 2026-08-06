import type { Client, InvoiceFormValues, Product } from "../../db/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { InvoiceForm } from "./InvoiceForm";

interface AddInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InvoiceFormValues) => Promise<void> | void;
  clients: Client[];
  products: Product[];
}

export function AddInvoiceDialog({
  open,
  onOpenChange,
  onSubmit,
  clients,
  products,
}: AddInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Invoice</DialogTitle>
        </DialogHeader>
        <InvoiceForm
          clients={clients}
          products={products}
          onCancel={() => onOpenChange(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
