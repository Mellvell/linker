import styles from './styles.module.scss'

import type InputTypes from './input.types'

export default function Input({
	type,
	name,
	id,
	placeholder,
	className,
  value,
  onChange,
  ...props
}: InputTypes) {
	return (
		<input
			type={type}
			name={name}
			id={id}
			placeholder={placeholder}
			className={`${styles.input} `}
      value={value}
      onChange={onChange}  
      {...props}
		/>
	)
}
