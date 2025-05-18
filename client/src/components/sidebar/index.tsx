import React from 'react'
import { NavLink } from 'react-router'
import styles from './styles.module.scss'
import Popup from '../popup'
import Profile from '../profile'

import SidebarItems from './sidebarItems'

export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>Linker</div>
			<nav className={styles.nav}>
				<SidebarItems>
					<Popup popupName='Profile'>
						<Profile />
					</Popup>
				</SidebarItems>
				<SidebarItems>
					<p>Create group</p>
				</SidebarItems>
				<SidebarItems>
					<p>Log out</p>
				</SidebarItems>
			</nav>
		</aside>
	)
}
