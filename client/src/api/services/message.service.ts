import api from '../index'

export default class MessagesService {
	static async getMessages(residerId: string) {
		if (!residerId) return
		const response = await api.get(`/message/getMessages/${residerId}`)
		return response.data
	}

	static async sendMessage(messageData: {
		chat_id: number
		receiver_id: number
		content: string
		file?: File | null
	}) {
		try {
			const formData = new FormData()
			// Добавляем данные в формате JSON в поле `data`
			formData.append(
				'data',
				JSON.stringify({
					chat_id: messageData.chat_id,
					receiver_id: messageData.receiver_id,
					content: messageData.content,
					file: messageData.file
				})
			)
			// Добавляем файл, если он есть
			if (messageData.file) {
				formData.append('file', messageData.file)
			}
			console.log('FormData:', formData.get('data'), formData.get('file'))

			const response = await api.post('/message/sendMessage', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return response // Возвращаем полный ответ
		} catch (error) {
			console.error('MessagesService: error sending message', error)
			throw error // Пробрасываем ошибку для обработки в сторе
		}
	}
}
