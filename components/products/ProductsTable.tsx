import { Edit } from "lucide-react";
import type { Product } from "../../db/schema";
import { Button } from "../ui/button";

interface ProductsTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
}

export function ProductsTable({ products, onEditProduct }: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {/* Mobile View */}
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

      {/* Desktop View */}
      <table className="hidden md:table w-full text-left text-sm">
        <thead className="bg-zinc-50 font-medium text-zinc-500">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">SKU</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white">
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                No products found. Add one to get started.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 font-medium text-zinc-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-zinc-500 truncate max-w-[200px]">
                  {product.description || "-"}
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {product.price || "-"}
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {product.sku || "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditProduct(product)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
