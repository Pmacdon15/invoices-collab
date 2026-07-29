import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";
import { parseParams } from "@/lib/utils";
import { ClientsPageContent } from "../../components/clients/ClientsPageContent";
import { getClients } from "../../dal/clients";

export default function ClientsPage(props: PageProps<"/clients">) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-8">
        <Suspense fallback={<Spinner />}>
          <ClientsPageContent
            clientsPromise={props.searchParams.then((p) =>
              getClients(Number(parseParams(p.page))),
            )}
          />
        </Suspense>
      </div>
    </div>
  );
}
