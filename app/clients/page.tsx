import { Suspense } from 'react'
import { ClientsPageContent } from '../../components/clients/ClientsPageContent'
import { getClients } from '../../dal/clients'

export default function ClientsPage() {
	const clientsPromise = getClients()

	return (
		<div className="min-h-screen bg-white text-zinc-900">
			<div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
				<Suspense
					fallback={<div className="p-8">Loading clients...</div>}
				>
					<ClientsPageContent clientsPromise={clientsPromise} />
				</Suspense>
			</div>
		</div>
	)
}
