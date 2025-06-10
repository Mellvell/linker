import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import Input from '../../input'
import Button from '../../button'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import ChatSkeleton from '../Skeleton/chatSkeleton/ChatSkeleton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import Popup from '../../popup'
import { useTranslation } from 'react-i18next'
import ChatHeader from './ChatHeader/ChatHeader'

const Chat = observer(({ selectedUser, chatId, setSelectedContact }: ChatProps) => {
	const { authStore, messageStore } = useContext(Context)
	const [textMessage, setTextMessage] = useState('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [popupText, setPopupText] = useState('')
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation('chat')

	const dialogMessages = (messageStore.messages || []).filter(
		msg =>
			(msg.sender_id === authStore.user.id &&
				msg.receiver_id === selectedUser.id) ||
			(msg.sender_id === selectedUser.id &&
				msg.receiver_id === authStore.user.id)
	)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('File Change');
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			setIsPopupOpen(true)
			console.log('Open', isPopupOpen)
		}

	}

	const handleSendWithFile = async () => {
		if (!selectedFile && !popupText.trim()) return
		setIsLoading(true)

		try {
			const messageData = {
				chat_id: chatId,
				receiver_id: selectedUser.id,
				content: popupText || ' ',
				file: selectedFile,
			}
			await messageStore.sendMessage(messageData)
			setIsLoading(false)
			setSelectedFile(null)
			setPreviewUrl(null)
			setPopupText('')
			setIsPopupOpen(false)
		} catch (error) {
			console.error('Failed to send message with file:', error)
		}
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!textMessage.trim()) return

		try {
			await messageStore.sendMessage({
				chat_id: chatId,
				receiver_id: selectedUser.id,
				content: textMessage,
			})
			setTextMessage('')
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	if (messageStore.isLoading) return <ChatSkeleton />
	if (messageStore.error) return <div>Error: {messageStore.error}</div>

	return (
		<form className={styles.chat} onSubmit={handleSendMessage}>
			<ChatHeader selectedUser={selectedUser} setSelectedContact={setSelectedContact} chatId={chatId} />
			<Messages messages={dialogMessages} />

			{/* Остальной код остается без изменений */}
			<div className={styles.messageForm}>
				<Input
					className={styles.messageInput}
					type='text'
					placeholder={t('input_messages_placeholder')}
					value={textMessage}
					onChange={e => setTextMessage(e.target.value)}
				/>
				<label htmlFor='file' className={styles.selectFileLabel}>
					<AttachFileIcon />
					<input
						id='file'
						type='file'
						className={styles.selectFile}
						onChange={handleFileChange}
					/>
				</label>
				<Button className={styles.messageButton} type='submit'>
					{t('button_message')}
				</Button>
			</div>

			{/* Попап для предпросмотра */}
			{isPopupOpen && (
				<Popup
					isOpen={isPopupOpen}
					className={isLoading ? styles.popup : ''}
					setIsOpen={setIsPopupOpen}
				>
					<div className={styles.previewPopup}>
						{previewUrl && selectedFile ? (
							selectedFile.type.startsWith('image/') ? (
								<img
									src={previewUrl}
									alt='Preview'
									className={styles.previewImage}
								/>
							) : (
								<div className={styles.filePreview}>
									<span>📄 {selectedFile.name}</span>
								</div>
							)
						) : null}
						<Input
							type='text'
							placeholder={t('input_file_text_placeholder')}
							value={popupText}
							onChange={e => setPopupText(e.target.value)}
							className={styles.popupInput}
						/>
						<div className={styles.popupButtons}>
							<Button
								className={styles.popupButtons}
								type='button'
								onClick={handleSendWithFile}
							>
								{t('button_file_send')}
							</Button>
							<Button
								className={styles.popupButtons}
								type='button'
								onClick={() => {
									setSelectedFile(null)
									setPreviewUrl(null)
									setPopupText('')
									setIsPopupOpen(false)
								}}
							>
								{t('button_file_cancel')}
							</Button>
						</div>
					</div>
				</Popup>
			)}
		</form>
	)
})

export default Chat
