import styles from './styles.module.scss'

import type ContactListSkeletonProps from './ContactListSkeleton.type'

export default function ContactListSkeleton({ count = 12}: ContactListSkeletonProps) {
  return (
		<div className={styles.skeletonContainer}>
			<div className={styles.skeletonTitle}></div>
			<div className={styles.skeletonContact}>
				{[...Array(count)].map((_, index) => (
					<div key={index} className={styles.skeletonItems}>
						<div className={styles.skeletonAvatar}></div>
						<div className={styles.skeletonLine}></div>
					</div>
				))}
			</div>
		</div>
	)
}
