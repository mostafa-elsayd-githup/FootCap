"use client"
import styles from "./skeletons.module.css";

export default function ProductListSkeleton() {
  const dummyCards = Array(8).fill(null);

  return (
    <div className={styles.products_grid}>
      {dummyCards.map((_, index) => (
        <div key={index} className={styles.product_card}>
          <div className={`${styles.shimmer_item} ${styles.img_placeholder}`} />
          <div className={`${styles.shimmer_item} ${styles.title_placeholder}`} />
          <div className={`${styles.shimmer_item} ${styles.price_placeholder}`} />
          <div className={`${styles.shimmer_item} ${styles.btn_placeholder}`} />
        </div>
      ))}
    </div>
  );
}