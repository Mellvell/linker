import { useContext } from 'react'
import styles from './styles.module.scss'
import type MessageProps from './message.type'
import { Context } from '../../../../main'

export default function Message({ text, id, userId, fileUrl }: MessageProps) {
	const { authStore } = useContext(Context)
	const isOwnMessage = userId === authStore.user.id

	return (
		<div
			key={id}
			className={`${styles.message} ${
				isOwnMessage ? styles.ownMessage : styles.interlocutorMessage
			}`}
		>
			{/* Отображаем текст */}
			{text && <span className={styles.text}>{text}</span>}
			{/* Отображаем изображение, если есть fileUrl */}
			{fileUrl && (
				<div className={styles.imageContainer}>
					<img src={fileUrl} alt='attachment' className={styles.image} />
				</div>
			)}
		</div>
	)
}
