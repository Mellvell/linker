import React from 'react'
import { observer } from 'mobx-react-lite'
import { fileStore }  from '../../store/file.store'
import styles from './styles.module.scss'
import useAvatar from '../../hooks/useAvatar/useAvatar'

import type AvatarProps from './avatar.types'

const Avatar: React.FC<AvatarProps> = observer(({ avatar, className, classNameWrap, maxWidth = '200px' }) => {
	const { avatarUrl, isLoading, error } = useAvatar(avatar)

	if (isLoading) {  
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {fileStore.error}</div>
	}

	if (!avatarUrl) {
		return <div>No avatar found</div>
	}

	return (
		<div className={`${styles.imgWarper} ${classNameWrap}`}>
			<img
        className={className}
				src={avatarUrl}
				alt='User avatar'
				style={{ maxWidth: maxWidth }}
			/>
		</div>
	)
})

export default Avatar