import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'

import EmptyChat from './EmptyChat/emptyChat'
import ContactList from './ContactList/ContactList'
import Contact from './ContactList/Contact/Contact'
import Chat from './Chat/Chat'

import styles from './styles.module.scss'
import type { User } from '../../types/api.types/user.types'

const ChatContainer = observer(() => {
	const { authStore, userStore, socketStore } = useContext(Context)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)

	useEffect(() => {
		console.log('ChatContainer: checking if contacts need to be fetched', {
			isAuth: authStore.isAuth,
			isReady: authStore.isReady,
			userId: authStore.user.id,
			contactsLength: userStore.contacts.length,
		})
		if (
			authStore.isAuth &&
			authStore.isReady &&
			authStore.user.id &&
			!userStore.contacts.length
		) {
			console.log('ChatContainer: fetching contacts')
			userStore.getUsersForContactList(authStore.user.id).then(() => {
				console.log('ChatContainer: contacts fetched', userStore.contacts)
			})
			socketStore.init(authStore.user.id) // Инициализация WebSocket
		}
	}, [
		authStore.isAuth,
		authStore.isReady,
		authStore.user.id,
		userStore.contacts.length,
	])

	if (!authStore.isReady) return <div>Loading auth...</div>
	if (userStore.isLoading) return <div>Loading contacts...</div>
	if (userStore.error) return <div>Error: {userStore.error}</div>

	return (
		<div className={styles.chatContainer}>
			<ContactList>
				{userStore.contacts.map(contact => (
					<Contact
						key={contact.id}
						name={contact.name}
						id={contact.id}
						avatar={contact.avatar}
						isOnline={
							socketStore.isSocketReady &&
							socketStore.onlineUserIds.includes(String(contact.id))
						}
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
})

export default ChatContainer
