import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react'
import styles from './styles.module.scss'
import Popup from '../../../popup'
import Input from '../../../input'
import Button from '../../../button'
import { Context } from '../../../../main'
import { useTranslation } from 'react-i18next'

interface FilePreviewPopupProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	selectedFile: File | null
	previewUrl: string | null
	popupText: string
	setPopupText: (text: string) => void
	setSelectedFile: (file: File | null) => void
	setPreviewUrl: (url: string | null) => void
	chatId: number
	receiverId: number
}

const FilePreviewPopup: React.FC<FilePreviewPopupProps> = ({
	isOpen,
	setIsOpen,
	selectedFile,
	previewUrl,
	popupText,
	setPopupText,
	setSelectedFile,
	setPreviewUrl,
	chatId,
	receiverId,
}) => {
	const { messageStore } = useContext(Context)
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation('chat')

	const handleSendWithFile = async () => {
		if (!selectedFile && !popupText.trim()) return
		setIsLoading(true)

		try {
			const messageData = {
				chat_id: chatId,
				receiver_id: receiverId,
				content: popupText || ' ',
				file: selectedFile,
			}
			await messageStore.sendMessage(messageData)
			setIsLoading(false)
			setSelectedFile(null)
			setPreviewUrl(null)
			setPopupText('')
			setIsOpen(false)
		} catch (error) {
			console.error('Failed to send message with file:', error)
			setIsLoading(false)
		}
	}

	return (
		<Popup
			isOpen={isOpen}
			className={isLoading ? styles.popup : ''}
			setIsOpen={setIsOpen}
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
							setIsOpen(false)
						}}
					>
						{t('button_file_cancel')}
					</Button>
				</div>
			</div>
		</Popup>
	)
}

export default FilePreviewPopup
