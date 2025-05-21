import styles from './styles.module.scss'
import Avatar from '../../avatar';
import { useContext } from 'react';
import { Context } from '../../../main';

interface SearchUserCard {
  id: number;
  name: string;
  surname: string;
  username: string;
  avatar: string;
}

export default function SearchUserCard({
	id,
	name,
	surname,
	username,
	avatar,
}: SearchUserCard) {
	const { chatStore } = useContext(Context)
	const handleCreateChat = async (receiverId: string) => {
		chatStore.createChats(receiverId)
	}	

	return (
		<div
			className={styles.userCard}
			onClick={() => handleCreateChat(id.toString())}
		>
			<Avatar avatar={avatar} maxWidth='50px' />
			<div className={styles.userInfo}>
				<h5 className={styles.userFullname}>
					{name} {surname}
				</h5>
				<p className={styles.userUsername}>{username}</p>
			</div>
		</div>
	)
}
