import styles from "./loading.module.css";

export default function Loading() {
  const imageGrid = Array(4).fill(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.subTitle}`}></div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.imagesSection}>
          <div className={styles.imageGrid}>
            {imageGrid.map((_, index) => (
              <div
                key={index}
                className={`${styles.skeleton} ${styles.imageBox}`}
              ></div>
            ))}
          </div>
          <div className={`${styles.skeleton} ${styles.statsPreviewBox}`}></div>
        </div>
        <div className={styles.formSection}>
          {" "}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div
                className={`${styles.skeleton} ${styles.sectionTitle}`}
              ></div>
            </div>
            <div className={styles.fieldGroup}>
              <div className={`${styles.skeleton} ${styles.label}`}></div>
              <div className={`${styles.skeleton} ${styles.input}`}></div>
            </div>
            <div className={styles.fieldGroup}>
              <div className={`${styles.skeleton} ${styles.label}`}></div>
              <div className={`${styles.skeleton} ${styles.textarea}`}></div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div
                className={`${styles.skeleton} ${styles.sectionTitle}`}
              ></div>
            </div>
            <div className={styles.pricingGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.fieldGroup}>
                  <div className={`${styles.skeleton} ${styles.label}`}></div>
                  <div className={`${styles.skeleton} ${styles.input}`}></div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <div className={`${styles.skeleton} ${styles.submitBtn}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
