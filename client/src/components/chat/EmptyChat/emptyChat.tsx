import React from 'react'
import styles from './styles.module.scss'

export default function EmptyChat() {
  return (
    <div className={styles.emptyChat}>
    <p>Выберите пользователя для начала чата</p>
  </div>
  )
}
