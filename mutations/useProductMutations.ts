import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProductAction, editProductAction } from "../actions/products";
import type { Product } from "../db/schema";

interface UseProductMutationsOptions {
  onAddSuccess?: (product: Product) => void;
  onEditSuccess?: (product: Product) => void;
  onError?: (error: string) => void;
}

export function useProductMutations(options?: UseProductMutationsOptions) {
  const addMutation = useMutation({
    mutationFn: (newProduct: Product) => addProductAction(newProduct),
    onSuccess: (result) => {
      if (result.reason) {
        toast.error(result.reason);
        options?.onError?.(result.reason);
      } else if (result.data) {
        toast.success("Product added successfully");
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
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      editProductAction(id, updates),
    onSuccess: (result) => {
      if (result.reason) {
        toast.error(result.reason);
        options?.onError?.(result.reason);
      } else if (result.data) {
        toast.success("Product updated successfully");
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
