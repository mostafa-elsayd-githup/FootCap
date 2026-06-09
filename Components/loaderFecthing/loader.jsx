"use client";
import styles from "./loader.module.css";
export default function Loader() {
  return (
    <div className={styles.overlay_loader}>
      <div className={styles.halfCircleLoader}></div>
    </div>
  );
}
