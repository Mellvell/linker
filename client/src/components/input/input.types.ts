export default interface InputTypes {
	type: string
	name?: string
	id?: string
	placeholder?: string;
  className?: string;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}