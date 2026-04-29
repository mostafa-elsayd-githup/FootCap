"use client";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button, Nav } from "react-bootstrap";
import Link from "next/link";
import styles from "./discounds.module.css";

import AOS from "aos";
import "aos/dist/aos.css";

function DiscoundComponent() {

  return (
    <>
      <section className={styles.discounde_section} data-aos="fade-up">
        <Container className={styles.container}>
          <div>
            <h1 className={styles.h1}>Become a Member & get 10% off</h1>
          </div>
          <span className={styles.Button}>
            <Link href="" >
              Sign up for free
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className={styles.anmation} />
          </span>
        </Container>
      </section>
    </>
  );
}
export default DiscoundComponent;
