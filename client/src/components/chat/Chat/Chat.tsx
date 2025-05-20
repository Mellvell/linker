import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import type Message from '../messages/message/message.type'
import Input from '../../input'
import Button from '../../button'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'

const Chat = observer(({ interlocutorName, userId, chatId }: ChatProps) => {
	const { authStore, messageStore } = useContext(Context)
	const [textMessage, setTextMessage] = useState('')

	// Защита от undefined
	const dialogMessages = (messageStore.messages || []).filter(
		msg =>
			(msg.senderid === authStore.user.id && msg.receiverid === userId) ||
			(msg.senderid === userId && msg.receiverid === authStore.user.id)
	)

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault()
		if (!textMessage.trim()) return
		console.log('Chat: sending message', textMessage)
		messageStore.sendMessage(userId, textMessage, chatId)
		setTextMessage('')
	}

	if (messageStore.isLoading) return <div>Loading messages...</div>
	if (messageStore.error) return <div>Error: {messageStore.error}</div>

	return (
		<div className={styles.chat}>
			<h2>Chat with {interlocutorName}</h2>
			<Messages messages={dialogMessages} />
			<form className={styles.messageForm} onSubmit={handleSendMessage}>
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
			</form>
		</div>
	)
})

export default Chat
