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
        {/* Card 1: Shoes */}
        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Shoes}`}></div>
          <Link
            className={styles.Button}
            href="/Collection/man_colliction/mans_section/shoes?type=shoes"
          >
            <span>Shoes</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.T_shirt}`}></div>
          <Link
            className={styles.Button}
            href="/Collection/man_colliction/mans_section/t_shirt/t-shirt_page?type=tshirt"
          >
            <span>T-shirt</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Hoody}`}></div>
          <Link
            className={styles.Button}
            href="/Collection/man_colliction/mans_section/hoody/hoody_page?type=hoogies"
          >
            <span>Hoody</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Shorts}`}></div>
          <Link
            className={styles.Button}
            href="/Collection/man_colliction/mans_section/short/short_page?type=short"
          >
            <span>Shorts</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mans_section;