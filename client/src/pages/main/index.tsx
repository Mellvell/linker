import Sidebar from '../../components/sidebar'
import ChatContainer from '../../components/chat/Index'

import styles from './styles.module.scss'

export default function Main() {
  return (
		<div className={styles.container}>
			<Sidebar />
			<ChatContainer />
		</div>
	)
}
