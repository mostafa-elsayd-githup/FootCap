"use client"
import Link from "next/link";
import styles from "./Sport.module.css";

function Sport() {
  return (
    <div data-aos="fade-left" className={styles.Container}>
      <div className={styles.container_info}>
        <h1 className={styles.title}>Footcap To Sport</h1>
        <p className={styles.p}>
          The training kit is designed to give you more strength.
        </p>

        <Link
          href="/Components/sport-Componente/sportProcuts?type=GEM"
          className={styles.Button}
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}
export default Sport;
