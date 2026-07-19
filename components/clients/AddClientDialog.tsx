import type { Client } from '../../db/schema'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { ClientForm } from './ClientForm'

interface AddClientDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (data: Client) => void
}

export function AddClientDialog({
	open,
	onOpenChange,
	onSubmit,
}: AddClientDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent className="sm:max-w-106.25">
				<DialogHeader>
					<DialogTitle>Add New Client</DialogTitle>
				</DialogHeader>
				<div className="mt-4">
					<ClientForm
						onCancel={() => onOpenChange(false)}
						onSubmit={async (data) => onSubmit(data)}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
