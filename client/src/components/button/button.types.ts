export interface ButtonTypes {
	children: React.ReactNode
	onClick?: () => void
	disabled?: boolean
	variant?: 'primary' | 'secondary'
	className?: string
	type: 'submit' | 'reset' | 'button' | undefined
}