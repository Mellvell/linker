import type { Dispatch, SetStateAction } from "react"

export default interface PopupProps {
	popupName?: string
	children: React.ReactNode
	className?: string
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}