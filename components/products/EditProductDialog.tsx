import type { Product } from "../../db/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ProductForm } from "./ProductForm";

interface EditProductDialogProps {
  product: Product | null;
  onClose: () => void;
  onSubmit: (data: Product) => void;
}

export function EditProductDialog({
  product,
  onClose,
  onSubmit,
}: EditProductDialogProps) {
  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Product/Service</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {product && (
            <ProductForm
              initialData={product}
              onSubmit={async (data) => {
                await onSubmit(data);                
              }}
              onCancel={onClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
