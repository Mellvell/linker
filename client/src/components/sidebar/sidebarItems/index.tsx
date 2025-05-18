import React from 'react'
import styles from './styles.module.scss'

import type SidebarItemsProps from './sidebar.types'

export default function SidebarItems({ children }: SidebarItemsProps) {
  return (
    <div className={styles.sidebarItems}>
      {children}
    </div>
  )
}
