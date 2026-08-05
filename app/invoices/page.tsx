import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";
import { parseParams } from "@/lib/utils";
import { InvoicesPageContent } from "../../components/invoices/InvoicesPageContent";
import { getClients } from "../../dal/clients";
import { getInvoices } from "../../dal/invoices";
import { getProducts } from "../../dal/products";

export default async function InvoicesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-8">
        <Suspense fallback={<Spinner />}>
          <InvoicesPageContent
            invoicesPromise={props.searchParams.then((p) =>
              getInvoices(Number(parseParams(p.page))),
            )}
            clientsPromise={getClients(1,1000)}
            productsPromise={getProducts(1,1000)}
          />
        </Suspense>
      </div>
    </div>
  );
}
