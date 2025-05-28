import React from 'react'
import styles from './styles.module.scss'

import type { TextFieldTypes } from './textField.types'

import Input from '../input'

export default function TextField({
	type,
	name,
	id,
	className,
	label,
	value,
	onChange,
	disabled,
	...props
}: TextFieldTypes) {
	return (
		<div className={styles['input-group']}>
			<Input
				id={id}
				type={type}
				placeholder=' '
				name={type}
				className={className}
				value={value}
				onChange={onChange}
				disabled={disabled}
        {...props}
			/>
			<label>{label}</label>
		</div>
	)
}
