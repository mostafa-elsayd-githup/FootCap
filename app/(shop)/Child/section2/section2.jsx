"use client";
import { Card } from "react-bootstrap";
import Link from "next/link";
import styles from "./section2.module.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Section2() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.container}>
      <h1 className={styles.title}>Kids</h1>
      <div className={styles.contante}>
        <Card className={styles.kids1}>
          <Card.Body className={styles.card}>
            <Link
              href="/Child/section2/section2_page"
              className={styles.Button}
            >
              <span>0 - 4 Y R S</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card.Body>
        </Card>

        <Card className={styles.kids2}>
          <Card.Body className={styles.card}>
            <Link
              href="/Child/section2/section2_page"
              className={styles.Button}
            >
              <span>4 - 8 Y R S</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card.Body>
        </Card>

        <Card className={styles.kids3}>
          <Card.Body className={styles.card}>
            <Link
              href="/Child/section2/section2_page"
              className={styles.Button}
            >
              <span>8 - 16 Y R S</span>
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
export default Section2;
