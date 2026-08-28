import styles from "./loading.module.css";

export default function Loading() {
  const statsCards = Array(3).fill(0);
  const reviewsList = Array(3).fill(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={`${styles.skeleton} ${styles.title}`}></div>
          <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
        </div>
        <div className={`${styles.skeleton} ${styles.filterBtn}`}></div>
      </div>

      <div className={styles.statsGrid}>
        {statsCards.map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.cardInfo}>
              <div className={`${styles.skeleton} ${styles.cardLabel}`}></div>
              <div className={`${styles.skeleton} ${styles.cardValue}`}></div>
            </div>
            <div className={`${styles.skeleton} ${styles.cardIcon}`}></div>
          </div>
        ))}
      </div>

      <div className={styles.reviewsWrapper}>
        {reviewsList.map((_, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.userHeader}>
              <div className={styles.userInfo}>
                <div className={`${styles.skeleton} ${styles.avatar}`}></div>
                <div className={styles.userMeta}>
                  <div className={`${styles.skeleton} ${styles.userName}`}></div>
                  <div className={`${styles.skeleton} ${styles.userDate}`}></div>
                </div>
              </div>
              <div className={`${styles.skeleton} ${styles.badge}`}></div>
            </div>
            <div className={`${styles.skeleton} ${styles.textLine}`}></div>
            <div className={`${styles.skeleton} ${styles.textLineShort}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}