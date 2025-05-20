import api from '../index'

export default class MessagesService {
	static async getMessages(residerId: string) {
		if (!residerId) return
		const response = await api.get(`/message/getMessages/${residerId}`)
		return response.data
	}

  static async sendMessage(
    receiverId: number,
    message: string,
    chatId: number
  ) {
		try {
			const response = await api.post('/message/sendMessage', {
				receiverId,
				chatId,
				message,
			})
			return response // Возвращаем полный ответ
		} catch (error) {
			console.error('MessagesService: error sending message', error)
			throw error // Пробрасываем ошибку, чтобы обработать в сторе
		}
	}
}
