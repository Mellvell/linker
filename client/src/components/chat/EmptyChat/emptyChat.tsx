import React from 'react'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

export default function EmptyChat() {
  const { t } = useTranslation('emptyChat')
  return (
    <div className={styles.emptyChat}>
    <p>{t('empty_text')}</p>
  </div>
  )
}
