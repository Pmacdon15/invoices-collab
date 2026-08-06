import { Suspense } from "react";
import { ProductsSkeleton } from "@/components/products/ProductsSkeleton";
import { parseParams } from "@/lib/utils";
import { ProductsPageContent } from "../../components/products/ProductsPageContent";
import { getProducts } from "../../dal/products";
export default function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-8">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsPageContent
            productsPromise={props.searchParams.then((p) =>
              getProducts(Number(parseParams(p.page))),
            )}
          />
        </Suspense>
      </div>
    </div>
  );
}
