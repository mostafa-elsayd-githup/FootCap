import styles from "./NotFoundComponent.module.css";
import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.iconBox}>🚫</div>
      <h2 className={styles.noDataTitle}>عذراً، لا توجد منتجات حالياً</h2>
      <p className={styles.noDataMsg}>
        يبدو أن هذا القسم لا يحتوي على منتجات في الوقت الحالي. 
        يمكنك تصفح أقسام أخرى أو العودة لاحقاً.
      </p>
      <Link href="/" className={styles.backBtn}>
        تصفح كل المنتجات
      </Link>
    </div>
  );
}