"use client";

import { Edit } from "lucide-react";
import type { Product } from "../../db/schema";
import { Button } from "../ui/button";

export interface ProductsMobileViewProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
}

export function ProductsMobileView({
  products,
  onEditProduct,
}: ProductsMobileViewProps) {
  return (
    <div className="block md:hidden divide-y divide-zinc-200">
      {products.length === 0 ? (
        <div className="p-8 text-center text-zinc-500">
          No products found. Add one to get started.
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-zinc-900">{product.name}</p>
                <p className="text-xs text-zinc-400">
                  SKU: {product.sku || "N/A"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditProduct(product)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            {product.description && (
              <p className="text-sm text-zinc-500 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-zinc-400 font-medium">Price</span>
              <p className="text-lg font-bold text-zinc-900">
                ${product.price || "0.00"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
