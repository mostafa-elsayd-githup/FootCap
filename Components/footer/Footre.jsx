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
        <Row className={`align-items-center ${styles.newsletter_row}`}>
          <Col lg={6} md={12}>
            <h4 className={styles.newsletter_title}>
              BECOME A MEMBER & GET 15% OFF
            </h4>
          </Col>
          <Col lg={6} md={12} className="mt-3 mt-lg-0">
            <InputGroup className={styles.input_group_custom}>
              <Form.Control
                placeholder="Your Email Address"
                className={styles.email_input}
              />
              <Button className={styles.submit_btn}>
                SIGN UP
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>PRODUCTS</h5>
            <ul className={styles.footer_list}>
              <li><Link href="/products/shoes">Shoes</Link></li>
              <li><Link href="/products/clothing">Clothing</Link></li>
              <li><Link href="/products/accessories">Accessories</Link></li>
              <li><Link href="/products/new-arrivals">New Arrivals</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>SPORTS</h5>
            <ul className={styles.footer_list}>
              <li><Link href="/sports/running">Running</Link></li>
              <li><Link href="/sports/football">Football</Link></li>
              <li><Link href="/sports/training">Training</Link></li>
              <li><Link href="/sports/outdoor">Outdoor</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>SUPPORT</h5>
            <ul className={styles.footer_list}>
              <li><Link href="/support/help">Help</Link></li>
              <li><Link href="/support/returns">Returns & Refunds</Link></li>
              <li><Link href="/support/size-guide">Size Guide</Link></li>
              <li><Link href="/support/contact">Contact Us</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5 className={styles.column_title}>FOLLOW US</h5>
            <div className={styles.social_icons}>
              <Link href="https://facebook.com" target="_blank" className={styles.social_icon_wrapper}>
                <FontAwesomeIcon icon={faFacebookF} className={styles.social_icon} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className={styles.social_icon_wrapper}>
                <FontAwesomeIcon icon={faInstagram} className={styles.social_icon} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className={styles.social_icon_wrapper}>
                <FontAwesomeIcon icon={faTwitter} className={styles.social_icon} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className={styles.social_icon_wrapper}>
                <FontAwesomeIcon icon={faYoutube} className={styles.social_icon} />
              </Link>
            </div>
          </Col>
        </Row>
        <Row className={styles.copyright_row}>
          <Col className="text-center">
            <p className={styles.copyright}>
              © {new Date().getFullYear()} FOOTCAP. Data settings | Privacy Policy | Terms and Conditions
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;