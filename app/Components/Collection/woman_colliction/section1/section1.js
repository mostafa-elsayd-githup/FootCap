"use client";
import styles from "./section1.module.css";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Section1() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن بالملي ثانية
      once: true, // الأنميشن يشتغل مرة واحدة بس وأنت نازل
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.container}>
    <section>
      <div className={styles.container_info}>
        <h1 className={styles.title}>Versatile Shoes.</h1>
        <p className={styles.p}> All-day comfort and support for everyday runs.</p>
          <Link className={styles.Button} href="/Components/Collection/woman_colliction/section1/section1_page">
            SHOP NOW
          </Link>
  
      </div>
    </section>
    </div>
   
    
  );
}
export default Section1;
