"use client";
import Link from "next/link";
import styles from "./mans_section.module.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Mans_section() {
  return (
    <div className={styles.sectionWrapper}>
      <h1 className={styles.title}>Man&apos;s section</h1>

      <div className={styles.Containers}>
        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Shoes}`}></div>
          <Link className={styles.Button} href="/ shoes/?type=shoes">
            <span>Shoes</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.T_shirt}`}></div>
          <Link className={styles.Button} href="/ t-shirt/?type=tshirt">
            <span>T-shirt</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Hoody}`}></div>
          <Link className={styles.Button} href="/ hoody/type=hoogies">
            <span>Hoody</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Shorts}`}></div>
          <Link className={styles.Button} href="/short/?type=short">
            <span>Shorts</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mans_section;
