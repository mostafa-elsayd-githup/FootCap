"use client"
import styles from "@/Components/Hero_com/hero.module.css";
import Link from "next/link";
import "aos/dist/aos.css";
import Clube from "./shrat_clube";
import Mans_section from "../../../Components/mans section/mans_section";
function Man_Colliction() {
  return (
    <>
      <section className={styles.head} data-aos="fade-up">
        <div className={styles.container_info}>
          <h1 className={styles.title}>Go on the celebrations.</h1>
          <p className={styles.p}>
            Transform your attendance to the Hall Season.
          </p>
          <Link
            href="/man/mens-Jerseys"
            className={styles.button}
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      <section className={styles.head2} data-aos="fade-up">
        <div className={styles.container_info}>
          <h1 className={styles.title}>Go on the celebrations.</h1>
          <p className={styles.p}>
            Transform your attendance to the Hall Season.
          </p>

          <Link
            href="/man/Sneakers-for-Men"
            className={styles.button}
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      <div data-aos="fade-up" className={styles.Container_shart}>
        <div>
          <h1 className={styles.hrader}>CALLING OUT ALL FOOTBALL FANS</h1>
        </div>
        <p className={styles.para}>
          Find your team’s newest kit and show your support in style.
        </p>
        <section className={styles.section}>
          <Clube />
        </section>
      </div>

      <section data-aos="fade-up" className={styles.mans_section}>
        <Mans_section />
      </section>
    </>
  );
}
export default Man_Colliction;
