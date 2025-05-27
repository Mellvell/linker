import styles from './styles.module.scss'
import Message from './message/Message'
import type MessagesProps from './messages.types'
import { useEffect, useRef } from 'react'

export default function Messages({ messages }: MessagesProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Прокрутка к последнему сообщению при изменении messages
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	return (
		<div className={styles.chatMessages}>
			{messages.map(msg => (
				<Message
					key={msg.message_id}
					userId={msg.sender_id}
					text={msg.content}
					id={msg.message_id}
					fileUrl={msg.file_url}
					fileName={msg.file_name}
				/>
			))}
			<div ref={messagesEndRef} /> {/* Пустой div для прокрутки */}
		</div>
	)
}
