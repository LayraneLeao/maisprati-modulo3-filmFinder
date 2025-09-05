import styles from './MovieCardSkeleton.module.css';

export function MovieCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.overflowHidden} ${styles.bgCard50} ${styles.backdropBlurSm} ${styles.borderBorder50}`}>
      <div className={`${styles.relative} ${styles.aspect23} ${styles.overflowHidden}`}>
        <div className={`${styles.skeleton} ${styles.wFull} ${styles.hFull}`} />
        <div className={`${styles.absolute} ${styles.top3} ${styles.right3}`}>
          <div className={`${styles.skeleton} ${styles.w12} ${styles.h6} ${styles.roundedFull}`} />
        </div>
      </div>
      <div className={`${styles.cardContent} ${styles.p4} ${styles.spaceY3}`}>
        <div className={styles.spaceY1}>
          <div className={`${styles.skeleton} ${styles.h5} ${styles.w3_4}`} />
          <div className={`${styles.skeleton} ${styles.h4} ${styles.w1_4}`} />
        </div>
        <div className={`${styles.flex} ${styles.gap1}`}>
          <div className={`${styles.skeleton} ${styles.h5} ${styles.w16} ${styles.roundedFull}`} />
          <div className={`${styles.skeleton} ${styles.h5} ${styles.w20} ${styles.roundedFull}`} />
        </div>
        <div className={styles.spaceY1}>
          <div className={`${styles.skeleton} ${styles.h4} ${styles.wFull}`} />
          <div className={`${styles.skeleton} ${styles.h4} ${styles.w5_6}`} />
          <div className={`${styles.skeleton} ${styles.h4} ${styles.w2_3}`} />
        </div>
      </div>
    </div>
  )
}