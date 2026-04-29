"use client";
import styles from "./hero.module.css";
import Link from "next/link";
import "aos/dist/aos.css";

function Hero() {
  return (
    <section className={styles.hero} data-aos="fade-up">
      <div className={styles.container_info}>
        <h1 className={styles.title}>HOLIDAY GIFTS</h1>
        <p className={styles.p}> Special picks for everyone on your list. </p>

        <Link
          href="/Components/Hero/hero_page?type=hero"
          className={styles.Button}
        >
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}
export default Hero;
