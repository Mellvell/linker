import { useContext, useEffect, useState } from 'react'
import EmptyChat from './EmptyChat/emptyChat'
import ContactList from './ContactList/ContactList'
import Contact from './ContactList/Contact/Contact'
import { observer } from 'mobx-react-lite'
import Chat from './Chat/Chat'
import styles from './styles.module.scss'
import { Context } from '../../main'
import type { User } from '../../types/api.types/user.types'
import ChatContainerSkeleton from './Skeleton'
import Search from '../search'

const ChatContainer = observer(() => {
	const { authStore, userStore, socketStore, messageStore, chatStore } =
		useContext(Context)
	const [selectedContact, setSelectedContact] = useState<{
		user: User
		chatId: number
	} | null>(null)

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
			socketStore.init(authStore.user.id)
		}
	}, [
		authStore.isAuth,
		authStore.isReady,
		authStore.user.id,
		userStore.contacts.length,
		chatStore.chats.length,
	])

	useEffect(() => {
		if (
			selectedContact &&
			!userStore.contacts.some(c => c.chatId === selectedContact.chatId)
		) {
			console.log('if Working');
			
			setSelectedContact(null)
		}
	}, [userStore.contacts, selectedContact])

	useEffect(() => {
		if (selectedContact && authStore.user.id) {
			console.log(
				'ChatContainer: fetching messages for interlocutor',
				selectedContact.user.id
			)
			messageStore.getMessages(`${selectedContact.user.id}`)
		}
	}, [selectedContact, authStore.user.id])

	if (!authStore.isReady) return <ChatContainerSkeleton />
	if (userStore.isLoading) return <ChatContainerSkeleton />
	if (userStore.error) return <div>Error: {userStore.error}</div>

	return (
		<Context.Provider
			value={{
				authStore,
				userStore,
				socketStore,
				messageStore,
				chatStore,
				setSelectedContact,
			}}
		>
			<div className={styles.chatContainer}>
				<div className={styles.contactListContainer}>
					<Search />
					<ContactList>
						{userStore.contacts.map(contact => (
							<Contact
								key={contact.user.id}
								name={contact.user.name}
								id={contact.user.id}
								avatar={contact.user.avatar}
								isOnline={
									socketStore.isSocketReady &&
									socketStore.onlineUserIds.includes(String(contact.user.id))
								}
								onClick={() => {
									console.log(contact.chatId)
									setSelectedContact(contact)
								}}
							/>
						))}
					</ContactList>
				</div>
				{selectedContact ? (
					<Chat
						selectedUser={selectedContact.user}
						chatId={selectedContact.chatId}
						setSelectedContact={setSelectedContact}
					/>
				) : (
					<EmptyChat />
				)}
			</div>
		</Context.Provider>
	)
})

export default ChatContainer
