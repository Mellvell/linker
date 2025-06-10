import type { User } from '../../../types/api.types/user.types'

export default interface ChatProps {
	selectedUser: User
	chatId: number
	setSelectedContact: (contact: null) => void
}
