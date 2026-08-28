import styles from "./loading.module.css";

export default function Loading() {
  const statsCards = Array(2).fill(0);
  const orderRows = Array(3).fill(0);

  return (
    <div className={styles.container}>
      <div className={styles.userBanner}>
        <div className={`${styles.skeleton} ${styles.avatar}`}></div>
        <div className={styles.userHeaderMeta}>
          <div className={`${styles.skeleton} ${styles.userName}`}></div>
          <div className={`${styles.skeleton} ${styles.statusBadge}`}></div>
        </div>
      </div>
      <div className={styles.statsGrid}>
        {statsCards.map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={`${styles.skeleton} ${styles.statIcon}`}></div>
            <div className={styles.statMeta}>
              <div className={`${styles.skeleton} ${styles.statTitle}`}></div>
              <div className={`${styles.skeleton} ${styles.statValue}`}></div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardHeaderTitle}`}></div>
          <div className={styles.infoList}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.infoRow}>
                <div className={`${styles.skeleton} ${styles.infoIcon}`}></div>
                <div className={`${styles.skeleton} ${styles.infoText}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardHeaderTitle}`}></div>

          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
              <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
              <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
            </div>

            <div className={styles.tableBody}>
              {orderRows.map((_, index) => (
                <div key={index} className={styles.tableRow}>
                  <div
                    className={`${styles.skeleton} ${styles.cellText}`}
                  ></div>
                  <div
                    className={`${styles.skeleton} ${styles.cellText}`}
                  ></div>
                  <div
                    className={`${styles.skeleton} ${styles.cellText}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
