"use client";
import { Card} from "react-bootstrap";
import Link from "next/link";
import styles from "./woman_section.module.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Woman_section() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن بالملي ثانية
      once: true, // الأنميشن يشتغل مرة واحدة بس وأنت نازل
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.container}>
      <div className={styles.title}>
        <h1 style={{ fontSize: "2.5rem", margin: "0 0 0 5px" }}>Woman</h1>
      </div>
      <div className={styles.contente}>
        <Card className={styles.bars}>
          <Card.Body className={styles.card}>
            <Link href="/Components/Collection/woman_colliction/woman_section/shop_bras/shop_pade" className={styles.Button}>
              SHOP BRAS
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card.Body>
        </Card>
        <Card className={styles.tights}>
          <Card.Body className={styles.card}>
            <Link href="/Components/Collection/woman_colliction/woman_section/shop_tights" className={styles.Button}>
              SHOP TIGHTS
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card.Body>
        </Card>
        <Card className={styles.hoodles}>
          <Card.Body className={styles.card}>
            <Link href="/Components/Collection/woman_colliction/woman_section/shop_hoodies" className={styles.Button}>
              SHOP Hoodies
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card.Body>
        </Card>
        <Card className={styles.traing}>
          <Card.Body className={styles.card}>
            <Link href="/Components/Collection/woman_colliction/woman_section/shop_training" className={styles.Button}>
              SHOP TRAINING
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default Woman_section;
