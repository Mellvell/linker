import React from 'react'
import { observer } from 'mobx-react-lite'
import { fileStore }  from '../../store/file.store'
import styles from './styles.module.scss'
import useAvatar from '../../hooks/useAvatar/useAvatar'

import type AvatarProps from './avatar.types'
import AvatarSkeleton from './AvatarSkeleton/AvatarSkeleton'

import noAvatar from '/static/assets/noAvatar/noAvatarPlaceholder.png?url'

const Avatar: React.FC<AvatarProps> = observer(({ avatar, className, classNameWrap, maxWidth = '200px' }) => {
	const { avatarUrl, isLoading, error } = useAvatar(avatar)

	if (isLoading) {  
		return (
			<div>
				<AvatarSkeleton maxWidth={maxWidth} />
			</div>
		)
	}

	if (error) {
		return <div>Error: {fileStore.error}</div>
	}

	if (!avatarUrl) {
		return (
			<div className={`${styles.imgWarper} ${classNameWrap}`}>
				<img style={{ maxWidth: maxWidth }} src={noAvatar} />
			</div>
		)
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