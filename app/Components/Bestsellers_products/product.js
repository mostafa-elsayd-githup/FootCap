"use client";
import styles from "./product.module.css";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
library.add(fas);

function Producte() {
  return (
    <div data-aos="fade-left" style={{ marginTop: "150px" }}>
      <Container>
        <div className={styles.title}>
          <h1 style={{ color: "black" }}>Bestsellers Products</h1>
          <ul className={styles.list}>
            <li>All</li>
            <li>Nike</li>
            <li>Adidas</li>
            <li>Puma</li>
            <li>Bate</li>
            <li>Apex</li>
          </ul>
        </div>
        <div className={styles.cards}>
          <Card style={{ width: "18rem" }}>
            <FontAwesomeIcon
              icon="bag-shopping"
              className={styles.icon_shope}
            />
            <FontAwesomeIcon
              icon={faHeartRegular}
              className={styles.icon_heart}
            />
            <Card.Img variant="top" src="/adidas2-1.svg" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>100$</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/adidas3-1.svg" />
            <FontAwesomeIcon
              icon="bag-shopping"
              className={styles.icon_shope}
            />
            <FontAwesomeIcon
              icon={faHeartRegular}
              className={styles.icon_heart}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>850$</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="adidas3.svg" />
            <FontAwesomeIcon
              icon="bag-shopping"
              className={styles.icon_shope}
            />
            <FontAwesomeIcon
              icon={faHeartRegular}
              className={styles.icon_heart}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>351$</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="adidas4.svg" />
            <FontAwesomeIcon
              icon="bag-shopping"
              className={styles.icon_shope}
            />
           <FontAwesomeIcon icon={faHeartRegular} className={styles.icon_heart} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>150$</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
export default Producte;
