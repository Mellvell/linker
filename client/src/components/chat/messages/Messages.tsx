import React from 'react'
import styles from './styles.module.scss'
import Message from './message/Message'
import type MessagesProps from './messages.types'

export default function Messages({ messages }: MessagesProps) {
	return (
		<div className={styles.chatMessages}>
			{messages.map(msg => (
				<Message
					key={msg.message_id}
					userId={msg.sender_id}
					text={msg.content}
					id={msg.message_id}
					fileUrl={msg.file_url} // Передаем file_url
				/>
			))}
		</div>
	)
}
