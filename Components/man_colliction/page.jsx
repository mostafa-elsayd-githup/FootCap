import styles from "./man_colliction.module.css";
import Link from "next/link";
import "aos/dist/aos.css";
import Clube from "./shrat_clube";
import Mans_section from "../../app/mans_section/mans_section";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import NavAction from "@/Components/Navbar/NavAction";

function Man_Colliction() {
  return (
    <>
      <NavAction /> {/* <= server componet dont add "use client" */}

      <section className={styles.head} data-aos="fade-up">
        <div className={styles.container_info}>
          <h1 className={styles.title}>Go on the celebrations.</h1>
          <p className={styles.p}>
            Transform your attendance to the Hall Season.
          </p>
          <Link
            href="/Collection/man_colliction/product_section1_in_mancomponet/?type=Men_s_Jerseys"
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
            href="/Collection/man_colliction/product_section2_in_mancomponet/?club=Sneakers_for_Men"
            className={styles.button}
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* man club */}
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
      <DiscoundComponent />
      <Footer />
    </>
  );
}
export default Man_Colliction;
