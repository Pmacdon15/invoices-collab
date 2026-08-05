import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addInvoiceAction, editInvoiceAction } from "../actions/invoices";
import type { Invoice } from "../db/schema";

interface UseInvoiceMutationsOptions {
  onAddSuccess?: (invoice: Invoice) => void;
  onEditSuccess?: (invoice: Invoice) => void;
  onError?: (error: string) => void;
}

export function useInvoiceMutations(options?: UseInvoiceMutationsOptions) {
  const addMutation = useMutation({
    mutationFn: (newInvoice: Invoice) => addInvoiceAction(newInvoice),
    onSuccess: (result) => {
      if (result.reason) {
        toast.error(result.reason);
        options?.onError?.(result.reason);
      } else if (result.data) {
        toast.success("Invoice added successfully");
        options?.onAddSuccess?.(result.data);
      }
    },
    onError: (err) => {
      const msg = err.message || "An unexpected error occurred";
      toast.error(msg);
      options?.onError?.(msg);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Invoice> }) =>
      editInvoiceAction(id, updates),
    onSuccess: (result) => {
      if (result.reason) {
        toast.error(result.reason);
        options?.onError?.(result.reason);
      } else if (result.data) {
        toast.success("Invoice updated successfully");
        options?.onEditSuccess?.(result.data);
      }
    },
    onError: (err) => {
      const msg = err.message || "An unexpected error occurred";
      toast.error(msg);
      options?.onError?.(msg);
    },
  });

  return {
    addMutation,
    editMutation,
  };
}
