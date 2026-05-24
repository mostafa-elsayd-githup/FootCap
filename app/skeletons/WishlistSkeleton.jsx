"use client"
import styles from "./skeletons.module.css";

export default function WishlistSkeleton() {
  const dummyWish = Array(4).fill(null);

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.shimmer_item} style={{ width: "240px", height: "32px", marginBottom: "24px" }} />
      
      <div className={styles.products_grid}>
        {dummyWish.map((_, index) => (
          <div key={index} className={styles.product_card}>
            <div className={`${styles.shimmer_item} ${styles.img_placeholder}`} />
            <div className={`${styles.shimmer_item} ${styles.title_placeholder}`} />
            <div className={`${styles.shimmer_item} ${styles.price_placeholder}`} />
            <div className={`${styles.shimmer_item} ${styles.btn_placeholder}`} />
          </div>
        ))}
      </div>
    </div>
  );
}