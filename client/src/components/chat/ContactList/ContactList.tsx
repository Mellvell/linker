import React from 'react'
import styles from './styles.module.scss'

import type ContactListProps from './contact.types'

const ContactList: React.FC<ContactListProps> = ({ children }) => {
	return (
		<div className={styles.contactList}>
			<div>
				<h2>Contacts</h2>
			</div>
			<div className={styles.contactWrap}>{children}</div>
		</div>
	)
}

export default ContactList
