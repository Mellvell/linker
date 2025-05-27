import { useContext } from 'react'
import styles from './styles.module.scss'
import type MessageProps from './message.type'
import { Context } from '../../../../main'
import InsertDriveFile from '@mui/icons-material/InsertDriveFile'
import Download from '@mui/icons-material/Download'

export default function Message({
	text,
	id,
	userId,
	fileUrl,
	fileName,
}: MessageProps) {
	const { authStore } = useContext(Context)
	const isOwnMessage = String(userId) === String(authStore.user.id)

	// Функция для проверки, является ли файл изображением
	const isImage = (url: string) => {
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
		return imageExtensions.some(ext => url.toLowerCase().endsWith(ext))
	}

	// Добавляем параметр fl_attachment к URL для скачивания
	const getDownloadUrl = (url: string, fileName?: string) => {
		const attachmentParam = fileName
			? `fl_attachment=${fileName}`
			: 'fl_attachment'
		return url.includes('?')
			? `${url}&${attachmentParam}`
			: `${url}?${attachmentParam}`
	}

	return (
		<div
			key={id}
			className={`${styles.message} ${
				isOwnMessage ? styles.ownMessage : styles.interlocutorMessage
			}`}
		>
			{/* Отображаем текст */}
			{text && <span className={styles.text}>{text}</span>}

			{/* Отображаем файл в зависимости от его типа */}
			{fileUrl && (
				<div className={styles.fileContainer}>
					{isImage(fileUrl) ? (
						<div className={styles.imageContainer}>
							<img src={fileUrl} alt='attachment' className={styles.image} />
						</div>
					) : (
						<a
							href={getDownloadUrl(fileUrl, fileName || undefined)} // Модифицируем URL для скачивания
							download
							className={styles.fileLink}
							target='_blank'
							rel='noopener noreferrer'
						>
							<InsertDriveFile className={styles.fileIcon} />
							<span>{fileName || 'Download file'}</span>
							<Download className={styles.downloadIcon} />
						</a>
					)}
				</div>
			)}
		</div>
	)
}
