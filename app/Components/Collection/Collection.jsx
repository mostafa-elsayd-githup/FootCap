
import { Card } from "react-bootstrap";
import Link from "next/link";
import styles from "./Collection.module.css";
function MenCollection() {
  return (
    <div data-aos="fade-up" className={styles.big_container}>
      <h1 style={{ textAlign: "start" }}>Who Are You Shooping..?</h1>
      <div className={styles.menCollection}>
        <Card className={styles.man_card}>
          <Link
            className={styles.Button}
            href="/Components/Collection/man_colliction"
          >
            Mens
          </Link>
        </Card>

        <Card className={styles.woman_card}>
          <Link
            className={styles.Button}
            href="/Components/Collection/woman_colliction"
          >
            Womens
          </Link>
        </Card>

        <Card className={styles.child_card}>
          <Link
            className={styles.Button}
            href="/Components/Collection/Child_Colliction"
          >
            Childrens
          </Link>
        </Card>
      </div>
    </div>
  );
}
export default MenCollection;
