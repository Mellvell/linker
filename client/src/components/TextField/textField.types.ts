export interface TextFieldTypes {
	type: string
	name?: string
	id?: string
	label?: string
	className?: string
	value?: string | number
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
} 