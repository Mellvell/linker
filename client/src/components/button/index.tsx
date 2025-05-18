import React from 'react'
import styles from './styles.module.scss'

import type { ButtonTypes } from './button.types'

export default function Button({
  children,
  onClick,
  disabled,
  variant,
  className,
  type,
  ...props
}: ButtonTypes) {
  return (
    <button onClick={onClick} type={type} {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  )
}
