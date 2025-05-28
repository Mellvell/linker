import type { User } from '../../../types/api.types/user.types'
import type Message from '../messages/message/message.type'

export default interface ChatProps {
	selectedUser: User
	chatId: number
	setSelectedContact: (contact: null) => void
}
