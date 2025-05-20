import React from 'react'
import styles from './styles.module.scss'

import type ContactListProps from './contact.types'
import Search from '../../search'

const ContactList: React.FC<ContactListProps> = ({ children }) => {
	return (
		<div className={styles.contactList}>
			<div>
				<Search />
				<h2>Contacts</h2>
			</div>
			<div className={styles.contactWrap}>{children}</div>
		</div>
	)
}

export default ContactList
