"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import styles from "./NotFound.module.css";

export default function NotFound() {
  const pathname = usePathname(); 

  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.blurCircle1}></div>
      <div className={styles.blurCircle2}></div>

      <div className={styles.contentBox}>
        <div className={styles.heroSection}>
          <h1 className={styles.errorCode}>404</h1>
          <div className={styles.divider}></div>
          <h2 className={styles.noDataTitle}>OUT OF BOUNDS</h2>
        </div>

        <p className={styles.noDataMsg}>
          The requested route{" "}
          <span className={styles.pathBadge}>
            {pathname || "this page"}
          </span>{" "}
          is unavailable or has been moved off the pitch.
        </p>

        <div className={styles.btnGroup}>
          <Link href="/" className={styles.backBtn}>
            RETURN TO HOME
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className={styles.secondaryBtn}
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
}