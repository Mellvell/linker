import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import Input from '../../input'
import Button from '../../button'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import ChatSkeleton from '../Skeleton/chatSkeleton/ChatSkeleton'
import Avatar from '../../avatar'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import Popup from '../../popup'
import { useTranslation } from 'react-i18next'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { userStore } from '../../../store/user.store'

const Chat = observer(({ selectedUser, chatId, setSelectedContact }: ChatProps) => {
	const { authStore, messageStore, socketStore, chatStore} = useContext(Context)
	const [textMessage, setTextMessage] = useState('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [popupText, setPopupText] = useState('')
	const [isPopupOpen, setIsPopupOpen] = useState(false) // Новое состояние для попапа
	const [isLoading, setIsLoading] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { t } = useTranslation('chat')

	const dialogMessages = (messageStore.messages || []).filter(
		msg =>
			(msg.sender_id === authStore.user.id &&
				msg.receiver_id === selectedUser.id) ||
			(msg.sender_id === selectedUser.id &&
				msg.receiver_id === authStore.user.id)
	)

	const handleDeleteChat = async () => {
		try {
			await chatStore.deleteChat(chatId ,selectedUser.id) // currentChatId должен быть доступен в компоненте
			setIsMenuOpen(false)
			userStore.getUsersForContactList(authStore.user.id)
			setSelectedContact(null)
		} catch (error) {
			console.error('Error deleting chat:', error)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('File Change');
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			setIsPopupOpen(true) // Открываем попап при выборе файла
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
			setIsPopupOpen(false) // Закрываем попап после отправки
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
			<div className={styles.chatHeader}>
				<div className={styles.userInfo}>
					<Avatar avatar={selectedUser.avatar} maxWidth='50px' />
					<div>
						<h5>{selectedUser.name}</h5>
						<p
							className={
								socketStore.onlineUserIds.includes(String(selectedUser.id))
									? styles.online
									: styles.status
							}
						>
							{socketStore.onlineUserIds.includes(String(selectedUser.id))
								? t('status_online')
								: t('status_offline')}
						</p>
					</div>
				</div>

				{/* Кнопка меню с выпадающим списком */}
				<div className={styles.chatMenu}>
					<Button
						type='button'
						className={styles.menuButton}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<MoreVertIcon /> {/* Иконка трех точек */}
					</Button>

					{isMenuOpen && (
						<div className={styles.dropdownMenu}>
							<button
								type='button'
								className={styles.menuItem}
								onClick={handleDeleteChat}
							>
								{t('delete_chat')}
							</button>
						</div>
					)}
				</div>
			</div>

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
