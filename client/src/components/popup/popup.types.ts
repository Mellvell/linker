import type { Dispatch, SetStateAction } from "react"

export default interface PopupProps {
	popupName?: string
	children: React.ReactNode
	classNamePopupName?: string
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}