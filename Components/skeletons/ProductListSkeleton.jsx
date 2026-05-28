"use client"
import styles from "./skeletons.module.css";

export default function ProductListSkeleton() {
  const dummyCards = Array(8).fill(null);

  return (
    <div className={styles.products_grid}>
      {dummyCards.map((_, index) => (
        <div key={index} className={styles.product_card}>
          {/* صورة الحذاء الفخمة */}
          <div className={`${styles.shimmer_item} ${styles.img_placeholder}`} />
          {/* اسم الحذاء / الماركة */}
          <div className={`${styles.shimmer_item} ${styles.title_placeholder}`} />
          {/* السعر */}
          <div className={`${styles.shimmer_item} ${styles.price_placeholder}`} />
          {/* زرار Add to Cart أو التفاصيل الدائري */}
          <div className={`${styles.shimmer_item} ${styles.btn_placeholder}`} />
        </div>
      ))}
    </div>
  );
}