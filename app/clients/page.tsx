import { Suspense } from "react";
import { parseParams } from "@/lib/utils";
import { ClientsPageContent } from "../../components/clients/ClientsPageContent";
import { getClients } from "../../dal/clients";

export default function ClientsPage(props: PageProps<"/clients">) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
        <Suspense fallback={<div className="p-8">Loading clients...</div>}>
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
