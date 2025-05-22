import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import Input from '../../input'
import Button from '../../button'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import ChatSkeleton from '../Skeleton/chatSkeleton/ChatSkeleton'
import Avatar from '../../avatar'

const Chat = observer(({ selectedUser, chatId }: ChatProps) => {
	const { authStore, messageStore, socketStore } = useContext(Context)
	const [textMessage, setTextMessage] = useState('')

	const dialogMessages = (messageStore.messages || []).filter(
		msg =>
			(msg.senderid === authStore.user.id && msg.receiverid === selectedUser.id) ||
			(msg.senderid === selectedUser.id && msg.receiverid === authStore.user.id)
	)

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!textMessage.trim()) return

		try {
			await messageStore.sendMessage(selectedUser.id, textMessage, chatId)
			setTextMessage('')
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	if (messageStore.isLoading) return <ChatSkeleton />
	if (messageStore.error) return <div>Error: {messageStore.error}</div>

	return (
		<form className={styles.chat} onSubmit={handleSendMessage}>
			<div className={styles.chatHeader}>
				<Avatar avatar={selectedUser.avatar} maxWidth='50px' />
				<div>
					<h5>{selectedUser.name}</h5>
					<p
						className={
							socketStore.onlineUserIds.includes(String(selectedUser.id))
								? styles.online
								: styles.status
						}
					>
						{socketStore.onlineUserIds.includes(String(selectedUser.id))
							? 'Online'
							: 'Offline'}
					</p>
				</div>
			</div>
			<Messages messages={dialogMessages} />
			<div className={styles.messageForm}>
				<Input
					className={styles.messageInput}
					type='text'
					placeholder='Напишите сообщение...'
					value={textMessage}
					onChange={e => setTextMessage(e.target.value)}
				/>
				<Button className={styles.messageButton} type='submit'>
					Отправить
				</Button>
			</div>
		</form>
	)
})

export default Chat
