import styles from "./loading.module.css";

export default function Loading() {
  const rows = Array(5).fill(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={`${styles.skeleton} ${styles.title}`}></div>
          <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
        </div>
        <div className={`${styles.skeleton} ${styles.searchBar}`}></div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
          <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
          <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
          <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
          <div className={`${styles.skeleton} ${styles.colHeader}`}></div>
        </div>
        <div className={styles.tableBody}>
          {rows.map((_, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.customerCol}>
                <div className={`${styles.skeleton} ${styles.avatar}`}></div>
                <div className={`${styles.skeleton} ${styles.name}`}></div>
              </div>
              <div>
                <div className={`${styles.skeleton} ${styles.statusBadge}`}></div>
              </div>
              <div>
                <div className={`${styles.skeleton} ${styles.textShort}`}></div>
              </div>
              <div>
                <div className={`${styles.skeleton} ${styles.textMedium}`}></div>
              </div>
              <div className={styles.actionsCol}>
                <div className={`${styles.skeleton} ${styles.icon}`}></div>
                <div className={`${styles.skeleton} ${styles.icon}`}></div>
                <div className={`${styles.skeleton} ${styles.icon}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}