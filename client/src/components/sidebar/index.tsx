import { NavLink } from 'react-router'
import styles from './styles.module.scss'

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'

import SidebarItems from './sidebarItems'

export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>Linker</div>
			<nav className={styles.nav}>
				<SidebarItems>
					<NavLink to={'/profile'}>
						<PersonOutlinedIcon /> Profile
					</NavLink>
				</SidebarItems>
				<SidebarItems>
					<NavLink to={'/'}>
						<ChatBubbleOutlineOutlinedIcon />
						Chats
					</NavLink>
				</SidebarItems>
				<SidebarItems>
					<NavLink to={'/settings'}>
						<SettingsOutlinedIcon />
						Settings
					</NavLink>
				</SidebarItems>
			</nav>
			<SidebarItems className={styles.logout}>
				<NavLink to={'/logout'}>
					<LogoutOutlinedIcon />
					Logout
				</NavLink>
			</SidebarItems>
		</aside>
	)
}
