"use client"
import { Card } from "react-bootstrap";
import Link from "next/link";
import styles from "./Collection.module.css";
function MenCollection() {
  return (
    <div  className={styles.big_container}>
      <h1 style={{ textAlign: "start" }}>Who Are You Shooping..?</h1>
      <div className={styles.menCollection}>
        <Card className={styles.man_card}>
          <Link
            className={styles.Button}
            href="/man"
          >
            Mens
          </Link>
        </Card>

        <Card className={styles.woman_card}>
          <Link
            className={styles.Button}
            href="/woman"
          >
            Womens
          </Link>
        </Card>

        <Card className={styles.child_card}>
          <Link
            className={styles.Button}
            href="/Child"
          >
            Childrens
          </Link>
        </Card>
      </div>
    </div>
  );
}
export default MenCollection;
