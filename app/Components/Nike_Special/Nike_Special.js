"use client";
import { Container, Card } from "react-bootstrap";
import styles from "./Nike_Special.module.css";
function Nike_Special() {
  return (
    <Container>
      <div className={styles.title}>
        <h1>Nike Special</h1>
      </div>
      <Container data-aos="fade-up">
        <div className={styles.Nike_Special}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/adidas3-1.svg" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>850$</Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/adidas3-1.svg" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>850$</Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/adidas3-1.svg" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>850$</Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/adidas3-1.svg" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>850$</Card.Text>
            </Card.Body>
          </Card>
        </div>
        
        <div className={styles.service}>
          <div className={styles.image}>
            <Card.Img variant="top" src="/service-1.svg" />
            <div className={styles.text}>
              <p>Free SHoping</p>
              <p>All orders over $150</p>
            </div>
          </div>

          <div className={styles.image}>
            <Card.Img variant="top" src="/service-2.svg" />
            <div className={styles.text}>
              <p>Quick Payment</p>
              <p>100% secure payment</p>
            </div>
          </div>

          <div className={styles.image}>
            <Card.Img variant="top" src="/service-3.svg" />
            <div className={styles.text}>
              <p>Free Returns</p>
              <p>Money back in 30 days</p>
            </div>
          </div>

          <div className={styles.image}>
            <Card.Img variant="top" src="/service-4.svg" />
            <div className={styles.text}>
              <p>24/7 Support</p>
              <p>Get Quick Support</p>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
export default Nike_Special;
