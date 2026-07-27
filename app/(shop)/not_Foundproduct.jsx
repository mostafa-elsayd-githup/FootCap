import Link from "next/link";
import styles from "./not_Foundproduct.module.css";

export default function NoProducts({ categoryName }) {
  return (
    <div className={styles.noProductsWrapper}>
      <div className={styles.blurCircle1}></div>
      <div className={styles.blurCircle2}></div>

      <div className={styles.contentBox}>
        <div className={styles.heroSection}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-box-open"></i>
          </div>
          <h2 className={styles.noDataTitle}>NO PRODUCTS FOUND</h2>
        </div>

        <p className={styles.noDataMsg}>
          We couldn&apos;t find any items in this collection right now.
          {categoryName && (
            <span className={styles.pathBadge}>
              CATEGORY: {categoryName.toUpperCase()}
            </span>
          )}
        </p>

        <div className={styles.btnGroup}>
          <Link href="/products" className={styles.btnPrimary}>
            BROWSE ALL PRODUCTS
          </Link>

          <Link href="/" className={styles.btnSecondary}>
            BACK TO HOME
          </Link>
        </div>

        <div className={styles.errorCode}>
          COLLECTION STATUS: EMPTY_RESULT
        </div>
      </div>
    </div>
  );
}