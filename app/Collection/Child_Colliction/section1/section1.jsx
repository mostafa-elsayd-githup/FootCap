"use client";
import Link from "next/link";
import styles from "./section1.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Section1() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن بالملي ثانية
      once: true, // الأنميشن يشتغل مرة واحدة بس وأنت نازل
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.contente}>
      <div className={styles.container_info}>
        <h1 className={styles.title}>HOLIDAY GIFTS</h1>
        <p className={styles.p}> Special picks for everyone on your list. </p>
        <Link className={styles.Button} href="/Components/Collection/Child_Colliction/section1/section1_page">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}
export default Section1;
