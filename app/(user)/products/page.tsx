import { Suspense } from "react";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";
import Spinner from "@/components/shared/spinner";
import { getProducts } from "@/dal/products";
import { parseParams } from "@/lib/utils";

export default function ProductsPage(props: PageProps<"/products">) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-8">
        <Suspense fallback={<Spinner />}>
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
