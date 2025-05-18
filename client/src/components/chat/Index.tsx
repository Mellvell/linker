import { useContext, useEffect, useState } from 'react'
import EmptyChat from './EmptyChat/emptyChat'
import ContactList from './ContactList/ContactList'
import Contact from './ContactList/Contact/Contact'
import { observer } from 'mobx-react-lite'
import Chat from './Chat/Chat'
import styles from './styles.module.scss'
import { Context } from '../../main'

import type { User } from '../../types/api.types/user.types'

const  ChatContainer = () => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const { store } = useContext(Context)

	useEffect(() => {
		const fetchContacts = async () => {
			await store.getUsersForContactList()
		}
		fetchContacts()
	}, [store])

	return (
		<div className={styles.chatContainer}>
			<ContactList>
				{ store.contacts.map(contact => (
					<Contact 
						key={contact.id}
						name={contact.name}
						id={contact.id}
						avatar={contact.avatar}
						isOnline={false}
						onClick={() => setSelectedUser(contact)}
					/>
				))}
			</ContactList>
			{selectedUser ? (
				<Chat interlocutorName={selectedUser.name} userId={selectedUser.id} />
			) : (
				<EmptyChat />
			)}
		</div>
	)
}

export default observer(ChatContainer)
