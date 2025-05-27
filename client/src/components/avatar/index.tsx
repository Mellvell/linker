import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'
import useAvatar from '../../hooks/useAvatar/useAvatar'
import type AvatarProps from './avatar.types'
import AvatarSkeleton from './AvatarSkeleton/AvatarSkeleton'

import noAvatar from '/static/assets/noAvatar/noAvatarPlaceholder.png?url'

const Avatar: React.FC<AvatarProps> = observer(
	({ avatar, className, classNameWrap, maxWidth = '200px' }) => {
		const { avatarUrl, isLoading, error } = useAvatar(avatar)

		if (isLoading) {
			return (
				<div>
					<AvatarSkeleton maxWidth={maxWidth} />
				</div>
			)
		}

		// Показываем noAvatar если есть ошибка или нет avatarUrl
		const displayUrl = error || !avatarUrl ? noAvatar : avatarUrl

		return (
			<div
				className={`${styles.imgWarper} ${classNameWrap}`}
				style={{ maxWidth: maxWidth, aspectRatio: '1 / 1' }}
			>
				<img
					className={className}
					src={displayUrl}
					alt='User avatar'
					onError={e => {
						// Дополнительная обработка на случай, если изображение не загрузится
						const img = e.target as HTMLImageElement
						img.src = noAvatar
					}}
				/>
			</div>
		)
	}
)

export default Avatar
