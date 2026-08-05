"use client";

import { useForm } from "@tanstack/react-form";
import { type ProductFormValues, ProductSchema } from "../../db/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ProductFormProps {
  initialData?: ProductFormValues | null;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
  onCancel: () => void;
}

function FormFieldWrapper({
  field,
  label,
  placeholder,
  type = "text",
}: {
  field: {
    name: string;
    handleBlur: () => void;
    handleChange: (value: string) => void;
    state: {
      value: string | null | undefined;
      meta: {
        isTouched: boolean | null | undefined;
        errors: unknown[] | null | undefined;
      };
    };
  };
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={field.state.value || ""}
      />
      {field.state.meta.isTouched &&
      field.state.meta.errors &&
      field.state.meta.errors.length > 0 ? (
        <p className="text-sm text-yellow-600 font-medium">
          Warning:{" "}
          {field.state.meta.errors
            .map((e) =>
              typeof e === "string"
                ? e
                : (e as { message?: string })?.message || String(e),
            )
            .join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export function ProductForm({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      sku: initialData?.sku || "",
      orgId: initialData?.orgId,
    } as ProductFormValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
    validators: {
      onBlur: ProductSchema,
      onSubmit: ProductSchema,
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => (
          <FormFieldWrapper
            field={field}
            label="Name"
            placeholder="e.g. Website Development"
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <FormFieldWrapper
            field={field}
            label="Description"
            placeholder="Description of product or service"
          />
        )}
      </form.Field>

      <form.Field name="price">
        {(field) => (
          <FormFieldWrapper
            field={field}
            label="Price"
            placeholder="e.g. 100.00"
          />
        )}
      </form.Field>

      <form.Field name="sku">
        {(field) => (
          <FormFieldWrapper
            field={field}
            label="SKU / Item Code"
            placeholder="e.g. WEB-DEV-01"
          />
        )}
      </form.Field>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button onClick={onCancel} type="button" variant="outline">
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit} type="submit">
              {isSubmitting ? "Saving..." : "Save Product/Service"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
