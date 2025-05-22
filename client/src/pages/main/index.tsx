import ChatContainer from '../../components/chat/Index'
import styles from './styles.module.scss'

export default function Main() {
  return (
		<div className={styles.mainContainer}>
			<ChatContainer />
		</div>
	)
}
