import { Client } from "../../db/schema";
import { ClientForm } from "./ClientForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface EditClientDialogProps {
  client: Client | null;
  onClose: () => void;
  onSubmit: (data: Client) => void;
}

export function EditClientDialog({ client, onClose, onSubmit }: EditClientDialogProps) {
  return (
    <Dialog open={!!client} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {client && (
            <ClientForm
              initialData={client}
              onSubmit={async (data) => onSubmit(data)}
              onCancel={onClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
