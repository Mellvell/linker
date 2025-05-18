import React from 'react'
import styles from './styles.module.scss'
import Message from './message/Message'
import type MessagesProps from './messages.types'

export default function Messages({ messages }: MessagesProps) {
	return (
		<div className={styles.chatMessages}>
			{messages.map(msg => (
				<Message userId={msg.userId} timestamp={msg.timestamp} text={msg.text} id={msg.id} />
			))}
		</div>
	)
}
