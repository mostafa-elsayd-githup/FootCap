"use client";
import Link from "next/link";
import styles from "./woman_section.module.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Woman_section() {
  return (
    <div className={styles.sectionWrapper}>
      <h1 className={styles.title}>Man&apos;s section</h1>

      <div className={styles.Containers}>
        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Shoes}`}></div>
          <Link
            href="/woman_colliction/woman_section/shop_bras/shop_pade"
            className={styles.Button}
          >
            SHOP BRAS
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.T_shirt}`}></div>

          <Link
            href="/woman_colliction/woman_section/shop_tights"
            className={styles.Button}
          >
            SHOP TIGHTS
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Hoody}`}></div>
          <Link
            href="/woman_colliction/woman_section/shop_hoodies"
            className={styles.Button}
          >
            SHOP Hoodies
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>

        <div className={styles.productCard}>
          <div className={`${styles.cardBg} ${styles.Shorts}`}></div>
          <Link
            href="/woman_colliction/woman_section/shop_training"
            className={styles.Button}
          >
            SHOP TRAINING
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Woman_section;
