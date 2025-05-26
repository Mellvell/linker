import React from 'react'
import styles from './styles.module.scss'

export default function SearchSkeleton() {
	return (
		<div className={styles.searchContainer}>
			<div className={styles.inputWrap}>
				<div className={styles.searchInputSkeleton} />
			</div>
			<div className={styles.resultsWrapper}>
				<div className={styles.resultsList}>
					{[...Array(5)].map((_, index) => (
						<div key={index} className={styles.skeletonItem}>
							<div className={styles.skeletonAvatar} />
							<div className={styles.skeletonText}>
								<div className={styles.skeletonLine} />
								<div className={styles.skeletonLineShort} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
