"use client";
import styles from "./section2.module.css";
import Link from "next/link";
import "aos/dist/aos.css";
function Section2() {
  return (
    <div data-aos="fade-up" className={styles.container}>
      <section>
        <div className={styles.container_info}>
          <h1 className={styles.title}>Lowkey styles</h1>
          <p className={styles.p}>Footwear that go with everything.</p>

          <Link
            className={styles.Button}
            href="/Components/Collection/woman_colliction/section2/section2_page"
          >
            SHOP NOW
          </Link>
        </div>
      </section>
    </div>
  );
}
export default Section2;
