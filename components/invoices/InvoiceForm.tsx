"use client";

import { useForm } from "@tanstack/react-form";
import { Plus, Trash2 } from "lucide-react";
import { startTransition, useOptimistic, useState } from "react";
import {
  type Client,
  type InvoiceFormValues,
  InvoiceSchema,
  type Product,
} from "../../db/schema";
import { useClientMutations } from "../../mutations/useClientMutations";
import { useProductMutations } from "../../mutations/useProductMutations";
import { AddClientDialog } from "../clients/AddClientDialog";
import { AddProductDialog } from "../products/AddProductDialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InvoiceFormProps {
  initialData?: InvoiceFormValues | null;
  clients: Client[];
  products: Product[];
  onSubmit: (values: InvoiceFormValues) => void;
  onCancel: () => void;
}

export function InvoiceForm({
  initialData,
  clients,
  products,
  onSubmit,
  onCancel,
}: InvoiceFormProps) {
  const [optimisticClients, setOptimisticClients] = useOptimistic(
    clients,
    (state, action: { type: "add"; client: Client }) => {
      if (action.type === "add") return [...state, action.client];
      return state;
    },
  );
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (state, action: { type: "add"; product: Product }) => {
      if (action.type === "add") return [...state, action.product];
      return state;
    },
  );
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      clientId: initialData?.clientId || "",
      items: initialData?.items || [],
      amount: initialData?.amount || "0.00",
      status: initialData?.status || "draft",
    } as InvoiceFormValues,
    onSubmit: async ({ value }) => {
      // Auto-calculate final amount on submit just to be safe
      const total = value.items.reduce(
        (sum, item) => sum + parseFloat(item.amount || "0"),
        0,
      );
      value.amount = total.toFixed(2);
      await onSubmit(value);
    },
    validators: {
      onBlur: InvoiceSchema,
      onSubmit: InvoiceSchema,
    },
  });

  const { addMutation: addClientMutation } = useClientMutations({
    onAddSuccess: (newClient) => {
      form.setFieldValue("clientId", newClient.id as string);
      setIsAddClientOpen(false);
    },
  });

  const { addMutation: addProductMutation } = useProductMutations({
    onAddSuccess: (_newProduct) => {
      setIsAddProductOpen(false);
    },
  });

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="space-y-4 rounded-lg border p-4 bg-gray-50/30">
          <h3 className="font-semibold text-lg">Invoice Details</h3>

          <form.Field name="clientId">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="clientId">Client</Label>
                <Select
                  value={field.state.value || ""}
                  onValueChange={(val) => {
                    if (val === "ADD_NEW") {
                      setIsAddClientOpen(true);
                    } else {
                      field.handleChange(val ?? "");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client">
                      {field.state.value && field.state.value !== "ADD_NEW"
                        ? optimisticClients.find(
                            (c) => c.id === field.state.value,
                          )?.name
                        : undefined}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="ADD_NEW"
                      className="font-medium text-blue-600"
                    >
                      + Add New Client
                    </SelectItem>
                    {optimisticClients.map((client) => (
                      <SelectItem key={client.id} value={client.id as string}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors?.length ? (
                  <p className="text-sm text-yellow-600 font-medium">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={field.state.value || "draft"}
                  onValueChange={(val) =>
                    field.handleChange(
                      val as "draft" | "sent" | "paid" | "overdue",
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-semibold text-lg flex items-center justify-between">
            Line Items
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentItems = form.getFieldValue("items") || [];
                form.setFieldValue("items", [
                  ...currentItems,
                  {
                    id: crypto.randomUUID(),
                    productId: "",
                    quantity: 1,
                    amount: "0.00",
                  },
                ]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </h3>

          <form.Field name="items">
            {(field) => {
              const items = field.state.value || [];
              const totalAmount = items.reduce(
                (sum, item) => sum + parseFloat(item.amount || "0"),
                0,
              );

              return (
                <div className="space-y-4">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No items added. Click 'Add Item' to start.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-[1fr_80px_100px_40px] gap-2 items-end bg-gray-50/50 p-2 rounded-md"
                        >
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">
                              Product / Service
                            </Label>
                            <Select
                              value={item.productId}
                              onValueChange={(val) => {
                                if (val === "ADD_NEW") {
                                  setIsAddProductOpen(true);
                                } else {
                                  const product = optimisticProducts.find(
                                    (p) => p.id === val,
                                  );
                                  const newItems = [...items];
                                  newItems[index] = {
                                    ...item,
                                    productId: val ?? "",
                                    amount: product
                                      ? (
                                          parseFloat(product.price) *
                                          item.quantity
                                        ).toFixed(2)
                                      : "0.00",
                                  };
                                  field.handleChange(newItems);
                                }
                              }}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="Select...">
                                  {item.productId &&
                                  item.productId !== "ADD_NEW"
                                    ? optimisticProducts.find(
                                        (p) => p.id === item.productId,
                                      )?.name
                                    : undefined}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value="ADD_NEW"
                                  className="font-medium text-blue-600"
                                >
                                  + Add Product
                                </SelectItem>
                                {optimisticProducts.map((p) => (
                                  <SelectItem key={p.id} value={p.id as string}>
                                    {p.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">Qty</Label>
                            <Input
                              type="number"
                              min="1"
                              className="h-9"
                              value={item.quantity}
                              onChange={(e) => {
                                const qty = parseInt(e.target.value, 10) || 1;
                                const product = optimisticProducts.find(
                                  (p) => p.id === item.productId,
                                );
                                const newItems = [...items];
                                newItems[index] = {
                                  ...item,
                                  quantity: qty,
                                  amount: product
                                    ? (parseFloat(product.price) * qty).toFixed(
                                        2,
                                      )
                                    : "0.00",
                                };
                                field.handleChange(newItems);
                              }}
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">
                              Amount
                            </Label>
                            <Input
                              type="number"
                              step="0.01"
                              className="h-9"
                              value={item.amount}
                              onChange={(e) => {
                                const newItems = [...items];
                                newItems[index] = {
                                  ...item,
                                  amount: e.target.value,
                                };
                                field.handleChange(newItems);
                              }}
                            />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 text-gray-400 hover:text-red-500"
                            onClick={() => {
                              const newItems = items.filter(
                                (_, i) => i !== index,
                              );
                              field.handleChange(newItems);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="flex justify-end pt-4 border-t">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold">
                            ${totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {field.state.meta.errors?.length ? (
                    <p className="text-sm text-yellow-600 font-medium">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4">
          <Button onClick={onCancel} type="button" variant="outline">
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit} type="submit">
                {isSubmitting ? "Saving..." : "Save Invoice"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      <AddClientDialog
        open={isAddClientOpen}
        onOpenChange={setIsAddClientOpen}
        onSubmit={(client) => {
          const tempId = crypto.randomUUID();
          startTransition(() => {
            setOptimisticClients({
              type: "add",
              client: { ...client, id: tempId } as Client,
            });
          });
          form.setFieldValue("clientId", tempId);
          addClientMutation.mutate(client);
        }}
      />
      <AddProductDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSubmit={(product) => {
          startTransition(() => {
            setOptimisticProducts({
              type: "add",
              product: { ...product, id: crypto.randomUUID() } as Product,
            });
          });
          addProductMutation.mutate(product);
        }}
      />
    </>
  );
}
