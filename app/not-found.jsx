"use client";
import Link from "next/link";
import styles from "./NotFound.module.css";
import { usePathname } from "next/navigation";
export default function NotFound() {
  const pathname = usePathname();

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
          <span className="font-mono text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">
            {pathname}
          </span>{" "}
          does not exist .
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
