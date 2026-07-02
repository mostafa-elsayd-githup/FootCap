"use client";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css"; 

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Caught by App Error Boundary:", error);
  }, [error]);

  return (
    <div className={styles.errorWrapper}>
      <div className={styles.blurCircle1}></div>
      <div className={styles.blurCircle2}></div>

      <div className={styles.contentBox}>
        
        <div className={styles.heroSection}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h1 className={styles.noDataTitle}>CONNECTION ERROR</h1>
        </div>

        <p className={styles.noDataMsg}>
          Check your internet connection or try reloading the pitch.
          <span className={styles.pathBadge}>
            {error?.message || "Something went wrong on our side."}
          </span>
        </p>

        <div className={styles.btnGroup}>
          <button onClick={() => reset()} className={styles.btnReset}>
            RELOAD
          </button>
          
          <Link href="/" className={styles.btnHome}>
            BACK TO HOME
          </Link>
        </div>
        
        <div className={styles.errorCode}>
          ERROR CODE: 500_ST_CRASH
        </div>

      </div>
    </div>
  );
}