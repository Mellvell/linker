import React, { useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import type Message from '../messages/message/message.type'
import Input from '../../input'
import Button from '../../button'

const initialMessages: Message[] = [
	{ id: 1, userId: 1, text: 'Привет!', timestamp: '2025-05-13 19:30' },
	{ id: 2, userId: 2, text: 'Здравствуй!', timestamp: '2025-05-13 19:31' },
]

export default function Chat({ interlocutorName, userId }: ChatProps) {
	const [messages, setMessages] = useState<Message[]>(initialMessages)

	// Фильтрация сообщений для выбранного пользователя
	const userMessages = messages.filter(msg => msg.userId === userId)
  
	return (
		<div className={styles.chat}>
			<h2>Chat with {interlocutorName}</h2>
			<Messages messages={userMessages} />
			<form className={styles.messageForm}>
				<Input className={styles.messageInput} type='text' placeholder='Напишите сообщение...' />
				<Button className={styles.messageButton} type='submit'>Отправить</Button>
			</form>
		</div>
	)
}
