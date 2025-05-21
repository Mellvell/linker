import styles from './styles.module.scss'

export default function ChatSkeleton() {
  return (
		<div className={styles.skeletonContainer}>
			<div className={styles.skeletonChat}>
				<div className={styles.skeletonTop} />
				<div className={styles.skeletonBody} />
				<div className={styles.skeletonBottom} />
			</div>
		</div>
	)
}
