'use client'; 
import { useEffect } from 'react';
import styles from './error.module.css';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
  
    console.error("API Error:", error);
  }, [error]);

  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>   Connection error Check your internet connection </h2>
        <p className={styles.errorMsg}>
       
        There appears to be a temporary server outage or an internet connection interruption.
        </p>
        
        <div className={styles.errorActions}>

          <button className={styles.retryBtn} onClick={() => reset()}>
           Try again
          </button>
          
          <Link href="/" className={styles.homeBtn}>
           back to home
          </Link>
        </div>
      </div>
    </div>
  );
}