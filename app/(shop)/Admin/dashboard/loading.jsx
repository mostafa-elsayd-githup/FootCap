import styles from "./loading.module.css";

export default function Loading() {
  const statsCards = Array(3).fill(0);

  return (
    <div className={styles.adminLayoutSkeleton}>

      <main className={styles.contentSkeleton}>
        <div className={styles.headerSkeleton}>
          <div className={`${styles.skeleton} ${styles.titleSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.buttonSkeleton}`}></div>
        </div>

        <div className={styles.topCardsSkeleton}>
          {statsCards.map((_, index) => (
            <div key={index} className={`${styles.cardSkeleton}`}>
              <div
                className={`${styles.skeleton} ${styles.cardTitleLine}`}
              ></div>
              <div
                className={`${styles.skeleton} ${styles.cardValueLine}`}
              ></div>
            </div>
          ))}
        </div>

        <div className={styles.chartsGridSkeleton}>
          <div className={`${styles.chartBoxSkeleton} ${styles.largeChart}`}>
            <div className={`${styles.skeleton} ${styles.chartHeader}`}></div>
            <div className={`${styles.skeleton} ${styles.chartArea}`}></div>
          </div>

          <div className={`${styles.chartBoxSkeleton} ${styles.smallChart}`}>
            <div className={`${styles.skeleton} ${styles.chartHeader}`}></div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.categoryLine}`}
              ></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
