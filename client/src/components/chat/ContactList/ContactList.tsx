import React, { useContext, useEffect } from 'react'
import styles from './styles.module.scss'

import type ContactListProps from './contact.types'
import type Chat from '../../../types/api.types/chat.types'

import Contact from './Contact/Contact'
import { Context } from '../../../main'

const ContactList: React.FC<ContactListProps> = ({ children }) => {
	return (
		<div className={styles.contactList}>
			<div>
				<h2>Contacts</h2>
			</div>
			<div>{children}</div>
			<div></div>
		</div>
	)
}

export default ContactList
