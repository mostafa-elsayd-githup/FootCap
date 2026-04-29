import { Container } from "react-bootstrap";
import styles from "./loading.module.css";

export default function Loading() {
  // سنعرض 8 كروت وهمية كمثال
  const skeletonCards = Array(8).fill(0);

  return (
    <Container className={styles.wrapper}>
      {/* محاكاة العنوان والوصف في أعلى الصفحة */}
      <div className={styles.headerSkeleton}>
        <div className={`${styles.line} ${styles.titleSkeleton} ${styles.skeleton}`}></div>
        <div className={`${styles.line} ${styles.descSkeleton} ${styles.skeleton}`}></div>
      </div>

      {/* شبكة المنتجات الوهمية */}
      <Container className={styles.grid}>
        {skeletonCards.map((_, index) => (
          <div key={index} className={styles.card}>
            {/* مكان الصورة */}
            <div className={`${styles.imageBox} ${styles.skeleton}`}></div>
            
            {/* مكان النصوص تحت الصورة */}
            <div className={styles.info}>
              <div className={`${styles.line} ${styles.nameSkeleton} ${styles.skeleton}`}></div>
              <div className={`${styles.line} ${styles.priceSkeleton} ${styles.skeleton}`}></div>
              <div className={`${styles.line} ${styles.categorySkeleton} ${styles.skeleton}`}></div>
              <div className={`${styles.line} ${styles.colorsSkeleton} ${styles.skeleton}`}></div>
            </div>
          </div>
        ))}
      </Container>
    </Container>
  );
}