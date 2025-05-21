import styles from './styles.module.scss'

interface AvatarSkeletonProps {
	maxWidth?: string
}

export default function AvatarSkeleton({ maxWidth = '200px'}: AvatarSkeletonProps) {
  return (
		<div style={{ maxWidth: maxWidth }} className={styles.avatarSkeleton} />
	)
}
