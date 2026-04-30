"use client";
import { Button, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
function Footer() {
  return (
    <footer className={styles.footer_wrapper}>
      <Container>
        {/* الجزء العلوي: Newsletter (مميز في أديداس) */}
        <Row className="align-items-center py-4 border-bottom border-secondary mb-5">
          <Col md={6}>
            <h4 className={styles.newsletter_title}>
              BECOME A MEMBER & GET 15% OFF
            </h4>
          </Col>
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Your Email Address"
                className={styles.email_input}
              />
              <Button variant="dark" className={styles.submit_btn}>
                SIGN UP
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* الجزء الأوسط: القوائم */}
        <Row>
          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>PRODUCTS</h5>
            <ul className={styles.footer_list}>
              <li>Shoes</li>
              <li>Clothing</li>
              <li>Accessories</li>
              <li>New Arrivals</li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>SPORTS</h5>
            <ul className={styles.footer_list}>
              <li>Running</li>
              <li>Football</li>
              <li>Training</li>
              <li>Outdoor</li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>SUPPORT</h5>
            <ul className={styles.footer_list}>
              <li>Help</li>
              <li>Returns & Refunds</li>
              <li>Size Guide</li>
              <li>Contact Us</li>
            </ul>
          </Col>
          <Col md={3} sm={6} className={styles.SocialIcons}>
            <h5 className={styles.column_title}>FOLLOW US</h5>
            <div className={styles.social_icons}>
              <Link href="">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className={styles.social_icon}
                />
              </Link>
              <Link href="">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={styles.social_icon}
                />
              </Link>
              <Link href="">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className={styles.social_icon}
                />
              </Link>
              <Link href="">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className={styles.social_icon}
                />
              </Link>
            </div>
          </Col>
        </Row>

        {/* الجزء السفلي: الحقوق */}
        <Row className="mt-5 py-3 border-top border-secondary text-center">
          <Col>
            <p className={styles.copyright}>
              © 2026 FOOTCAP. Data settings | Privacy Policy | Terms and
              Conditions
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
