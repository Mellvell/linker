import { useContext, useEffect, useState } from 'react'
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

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY 

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

	// Состояние для хранения данных превью
	const [videoPreview, setVideoPreview] = useState<{
		title: string
		thumbnail: string
	} | null>(null)

	// Функция для обработки текста с ссылками и получения превью
	const renderTextWithLinks = (text: string) => {
		const urlRegex = /(https?:\/\/[^\s]+)/g
		const youtubeRegex = /(https?:\/\/www\.youtube\.com\/watch\?v=[\w-]+)/

		useEffect(() => {
			const youtubeMatch = text.match(youtubeRegex)
			if (youtubeMatch) {
				const videoId = youtubeMatch[0].split('v=')[1]
				fetch(
					`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
				)
					.then(response => response.json())
					.then(data => {
						if (data.items && data.items.length > 0) {
							const snippet = data.items[0].snippet
							setVideoPreview({
								title: snippet.title,
								thumbnail:
									snippet.thumbnails.high?.url ||
									snippet.thumbnails.default.url,
							})
						}
					})
					.catch(error => console.error('Error fetching video data:', error))
			}
		}, [text])

		return text.split(urlRegex).map((part, index) => {
			if (part.match(urlRegex)) {
				return (
					<a
						key={index}
						href={part}
						target='_blank'
						rel='noopener noreferrer'
						className={styles.link}
					>
						{part}
					</a>
				)
			}
			return part
		})
	}

	return (
		<div
			key={id}
			className={`${styles.message} ${
				isOwnMessage ? styles.ownMessage : styles.interlocutorMessage
			}`}
		>
			{/* Отображаем текст с обработкой ссылок */}
			{text && <span className={styles.text}>{renderTextWithLinks(text)}</span>}

			{/* Отображаем превью видео, если оно есть */}
			{videoPreview && (
				<div className={styles.videoPreview}>
					<img
						src={videoPreview.thumbnail}
						alt={videoPreview.title}
						className={styles.previewImage}
					/>
					<div className={styles.previewInfo}>
						<span className={styles.previewTitle}>{videoPreview.title}</span>
					</div>
				</div>
			)}

			{/* Отображаем файл в зависимости от его типа */}
			{fileUrl && (
				<div className={styles.fileContainer}>
					{isImage(fileUrl) ? (
						<div className={styles.imageContainer}>
							<img src={fileUrl} alt='attachment' className={styles.image} />
						</div>
					) : (
						<a
							href={getDownloadUrl(fileUrl, fileName || undefined)}
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
