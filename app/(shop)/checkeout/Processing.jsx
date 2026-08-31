"use client";

import styles from "./Processing.module.css";

export default function ProcessingOverlay({ 
  isopen,
  message = "Processing your order..." 
}) {
  if (!isopen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modalCard}>
        <div className={styles.spinner} />
        {message && <p className={styles.text}>{message}</p>}
      </div>
    </div>
  );
}