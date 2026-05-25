"use client"
import Link from "next/link";
import styles from "./NotFoundComponent.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.glowBg}></div>

      <div className={styles.contentBox}>
        <div className={styles.iconContainer}>
          <span className={styles.errorCode}>404</span>
          <div className={styles.floatingBall}>⚽</div>
        </div>

        <h1 className={styles.noDataTitle}>Out of Bounds!</h1>
        
        <p className={styles.noDataMsg}>
          Looks like you&apos;ve sprinted into a wrong lane, or this page left the starting lineup. Don&apos;t worry, the match is still on!
        </p>

        {/* Action Button */}
        <div className={styles.btnGroup}>
          <Link href="/" className={styles.backBtn}>
            Back to Main Pitch 
          </Link>
        </div>
      </div>
    </div>
  );
}