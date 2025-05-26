import React from 'react'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

import type ContactListProps from './contact.types'

const ContactList: React.FC<ContactListProps> = ({ children }) => {
	const { t } = useTranslation('contactList')
	return (
		<div className={styles.contactList}>
			<div>
				<h2>{t('title')}</h2>
			</div>
			<div className={styles.contactWrap}>{children}</div>
		</div>
	)
}

export default ContactList
