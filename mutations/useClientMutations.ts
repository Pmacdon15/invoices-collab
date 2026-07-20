import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addClientAction, editClientAction } from "../actions/clients";
import type { Client } from "../db/schema";

interface UseClientMutationsOptions {
  onAddSuccess?: (client: Client) => void;
  onEditSuccess?: (client: Client) => void;
  onError?: (error: string) => void;
}

export function useClientMutations(options?: UseClientMutationsOptions) {
  const addMutation = useMutation({
    mutationFn: (newClient: Client) => addClientAction(newClient),
    onSuccess: (result) => {
      if (result.reason) {
        toast.error(result.reason);
        options?.onError?.(result.reason);
      } else if (result.data) {
        toast.success("Client added successfully");
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
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Client> }) =>
      editClientAction(id, updates),
    onSuccess: (result) => {
      if (result.reason) {
        toast.error(result.reason);
        options?.onError?.(result.reason);
      } else if (result.data) {
        toast.success("Client updated successfully");
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
