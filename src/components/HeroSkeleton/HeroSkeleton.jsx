import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import styles from "./HeroSkeleton.module.css";

export function HeroSkeleton() {
  return (
    <section className={styles.heroSection}>
      {/* Background Skeleton */}
      <Skeleton className={styles.backgroundSkeleton} />

      {/* Content Skeleton */}
      <div className={styles.contentContainer}>
        <div className={styles.gridLayout}>
          {/* Poster Skeleton */}
          <div className={styles.posterContainer}>
            <Skeleton className={styles.posterSkeleton} />
          </div>

          {/* Info Skeleton */}
          <div className={styles.infoContainer}>
            {/* Title */}
            <div className={styles.titleGroup}>
              <Skeleton className={styles.mainTitle} />
              <Skeleton className={styles.subTitle} />
            </div>

            {/* Metadata */}
            <div className={styles.metadataContainer}>
              <Skeleton className={styles.metadataItem} />
              <Skeleton className={styles.metadataItem} />
              <Skeleton className={styles.ratingBadge} />
            </div>

            {/* Genres */}
            <div className={styles.genresContainer}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className={styles.genreBadge} />
              ))}
            </div>

            {/* Overview */}
            <div className={styles.overviewContainer}>
              <Skeleton className={styles.overviewLine} />
              <Skeleton className={styles.overviewLine} />
              <Skeleton className={styles.overviewLine} />
            </div>

            {/* Showtimes */}
            <div className={styles.showtimesContainer}>
              <Skeleton className={styles.showtimesTitle} />
              <div className={styles.timeSlotsContainer}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className={styles.timeSlot} />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.buttonsContainer}>
              <Skeleton className={styles.primaryButton} />
              <Skeleton className={styles.secondaryButton} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}