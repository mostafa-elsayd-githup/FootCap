import styles from "./loading.module.css";

export default function Loading() {
  const productRows = Array(6).fill(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={`${styles.skeleton} ${styles.title}`}></div>
          <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
        </div>
        <div className={`${styles.skeleton} ${styles.addBtn}`}></div>
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
          {productRows.map((_, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.productCol}>
                <div className={`${styles.skeleton} ${styles.thumbnail}`}></div>
              </div>
              <div>
                <div className={`${styles.skeleton} ${styles.categoryText}`}></div>
              </div>
              <div>
                <div className={`${styles.skeleton} ${styles.priceText}`}></div>
              </div>
              <div>
                <div className={`${styles.skeleton} ${styles.stockBadge}`}></div>
              </div>
              <div className={styles.actionsCol}>
                <div className={`${styles.skeleton} ${styles.actionBtn}`}></div>
                <div className={`${styles.skeleton} ${styles.actionBtn}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}