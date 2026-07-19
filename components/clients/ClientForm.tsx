'use client'

import { useForm } from '@tanstack/react-form'
import { type ClientFormValues, ClientSchema } from '../../db/schema'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface ClientFormProps {
	initialData?: ClientFormValues | null
	onSubmit: (values: ClientFormValues) => Promise<void> | void
	onCancel: () => void
}

function FormFieldWrapper({
	field,
	label,
	placeholder,
	type = 'text',
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field: any
	label: string
	placeholder?: string
	type?: string
}) {
	return (
		<div className="space-y-1">
			<Label htmlFor={field.name}>{label}</Label>
			<Input
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				placeholder={placeholder}
				type={type}
				value={field.state.value || ''}
			/>
			{field.state.meta.isTouched && field.state.meta.errors ? (
				<p className="text-sm text-yellow-600 font-medium">
					Warning: {field.state.meta.errors.join(', ')}
				</p>
			) : null}
		</div>
	)
}

export function ClientForm({
	initialData,
	onSubmit,
	onCancel,
}: ClientFormProps) {
	const form = useForm({
		defaultValues: {
			name: initialData?.name || '',
			email: initialData?.email || '',
			phone: initialData?.phone || '',
			address: initialData?.address || '',
		} as ClientFormValues,
		onSubmit: async ({ value }) => {
			await onSubmit(value)
		},
		validators: {
			onBlur: ClientSchema,
			onSubmit: ClientSchema,
		},
	})

	return (
		<form
			className="space-y-4"
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
		>
			<form.Field name="name">
				{(field) => (
					<FormFieldWrapper
						field={field}
						label="Name"
						placeholder="e.g. John Doe"
					/>
				)}
			</form.Field>

			<form.Field name="email">
				{(field) => (
					<FormFieldWrapper
						field={field}
						label="Email"
						placeholder="john@example.com"
						type="email"
					/>
				)}
			</form.Field>

			<form.Field name="phone">
				{(field) => (
					<FormFieldWrapper
						field={field}
						label="Phone Number"
						placeholder="123-456-7890"
					/>
				)}
			</form.Field>

			<form.Field name="address">
				{(field) => (
					<FormFieldWrapper
						field={field}
						label="Address"
						placeholder="123 Main St"
					/>
				)}
			</form.Field>

			<div className="flex items-center justify-end gap-2 pt-4">
				<Button onClick={onCancel} type="button" variant="outline">
					Cancel
				</Button>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button disabled={!canSubmit} type="submit">
							{isSubmitting ? 'Saving...' : 'Save Client'}
						</Button>
					)}
				</form.Subscribe>
			</div>
		</form>
	)
}
