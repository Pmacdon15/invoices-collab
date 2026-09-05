"use client";

import type { Product } from "../../db/schema";
import { ProductsDesktopTable } from "./ProductsDesktopTable";
import { ProductsMobileView } from "./ProductsMobileView";

export interface ProductsTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
}

export function ProductsTable(props: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <ProductsMobileView {...props} />
      <ProductsDesktopTable {...props} />
    </div>
  );
}
