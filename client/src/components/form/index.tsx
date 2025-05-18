import React from 'react'
import styles from './styles.module.scss'

import type FormTypes from './form.types'

export default function Form({ children, onSubmit, className = '', formClassName = ''}: FormTypes) {
  return (
		<div className={`${styles.formContainer} ${className}`}>
			<form className={`${styles.form} ${formClassName}`} onSubmit={onSubmit}>
				{children}
			</form>
		</div>
	)
}
