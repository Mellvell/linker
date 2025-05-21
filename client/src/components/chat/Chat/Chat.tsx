import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import Input from '../../input'
import Button from '../../button'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import ChatSkeleton from '../Skeleton/chatSkeleton/ChatSkeleton'

const Chat = observer(({ interlocutorName, userId, chatId }: ChatProps) => {
	const { authStore, messageStore } = useContext(Context)
	const [textMessage, setTextMessage] = useState('')

	const dialogMessages = (messageStore.messages || []).filter(
		msg =>
			(msg.senderid === authStore.user.id && msg.receiverid === userId) ||
			(msg.senderid === userId && msg.receiverid === authStore.user.id)
	)

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!textMessage.trim()) return

		try {
			await messageStore.sendMessage(userId, textMessage, chatId)
			setTextMessage('')
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	if (messageStore.isLoading) return <ChatSkeleton />
	if (messageStore.error) return <div>Error: {messageStore.error}</div>

	return (
		<form className={styles.chat} onSubmit={handleSendMessage}>
			<h2 className={styles.chatTitle}>Chat with {interlocutorName}</h2>
			<Messages messages={dialogMessages} />
			<div className={styles.messageForm}>
				<Input
					className={styles.messageInput}
					type='text'
					placeholder='Напишите сообщение...'
					value={textMessage}
					onChange={e => setTextMessage(e.target.value)}
				/>
				<Button
					className={styles.messageButton}
					type='submit'
				>
					Отправить
				</Button>
			</div>
		</form>
	)
})

export default Chat
