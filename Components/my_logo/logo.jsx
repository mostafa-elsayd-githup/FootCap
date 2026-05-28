"use client"
import styles from './Logo.module.css';

export default function MostoreLogo() {
  return (
    <div className={styles.logoContainer}>
      <span className={styles.moText}>Mo</span>
      <span className={styles.storeText}>store</span>
    </div>
  );
}