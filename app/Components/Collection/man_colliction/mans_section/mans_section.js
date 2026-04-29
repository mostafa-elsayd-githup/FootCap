"use client";
import { Card } from "react-bootstrap";
import Link from "next/link";
import styles from "./mans_section.module.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Mans_section() {
  return (
    <div style={{ margin: "80px 10px" }}>
      <div>
        <h1 className={styles.title}>Man&apos;s section</h1>
      </div>
      <div className={styles.Containers}>
        <Card className={styles.Shoes}>
          <Card className={styles.card}>
            <Link
              className={styles.Button}
              href="/Components/Collection/man_colliction/mans_section/shoes"
            >
              Shoes
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card>
        </Card>
        <Card className={styles.T_shirt}>
          <Card className={styles.card}>
            <Link
              className={styles.Button}
              href="/Components/Collection/man_colliction/mans_section/t_shirt/t-shirt_page"
            >
              T-shirt
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card>
        </Card>
        <Card className={styles.Hoody}>
          <Card className={styles.card}>
            <Link
              className={styles.Button}
              href="/Components/Collection/man_colliction/mans_section/hoody/hoody_page"
            >
              Hoody
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card>
        </Card>
        <Card className={styles.Shorts}>
          <Card className={styles.card}>
            <Link
              className={styles.Button}
              href="/Components/Collection/man_colliction/mans_section/short/short_page"
            >
              Shorts
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.anmation}
              />
            </Link>
          </Card>
        </Card>
      </div>
    </div>
  );
}
export default Mans_section;
