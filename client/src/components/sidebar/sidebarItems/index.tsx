import styles from './styles.module.scss'

import type SidebarItemsProps from './sidebar.types'

export default function SidebarItems({
	children,
	className,
}: SidebarItemsProps) {
	return <div className={`${styles.sidebarItems} ${className}`}>{children}</div>
}
