import type { User } from "../../../../types/api.types/user.types";

export default interface MessageFormProps {
	chatId: number
	selectedUser: User
	setSelectedFile: (file: File | null) => void
	setPreviewUrl: (url: string | null) => void
	setPopupText: (text: string) => void
	setIsPopupOpen: (isOpen: boolean) => void
}