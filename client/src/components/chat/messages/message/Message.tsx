import { useContext } from 'react'
import styles from './styles.module.scss'
import type MessageProps from './message.type'
import { Context } from '../../../../main'

export default function Message({ text, id, userId }: MessageProps) {
	const { authStore } = useContext(Context)
	const isOwnMessage = userId === authStore.user.id

	return (
		<div
			key={id}
			className={`${styles.message} ${
				isOwnMessage ? styles.ownMessage : styles.interlocutorMessage
			}`}
		>
			<span className={styles.text}>{text}</span>
		</div>
	)
}
