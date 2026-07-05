"use client";
import { Card } from "react-bootstrap";
import styles from "./discound_section.module.css";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Discound_section() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.continer}>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        className="mySwiper"
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/test_for_woman_deccounte.WebP" />
            <Card.Body className={styles.card}>
              <Card.Title className={styles.title_clube}>
                Originals Women&apos;s Shoes
              </Card.Title>
              <Card.Title className={styles.title_clube}>
                Classical sports meets iconic style
              </Card.Title>

              <Link href="" className={styles.Button}>
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>
        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/test_for_woman_deccounte7.WebP" />
            <Card.Body className={styles.card}>
              <Card.Title className={styles.title_clube}>
                Women&apos;s running shoes
              </Card.Title>
              <Card.Title className={styles.title_clube}>
                Classical sports meets iconic style
              </Card.Title>

              <Link href="" className={styles.Button}>
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>
        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/test_for_woman_deccounte2.WebP" />
            <Card.Body className={styles.card}>
              <Card.Title className={styles.title_clube}>
                Adidas women&apos;s sneakers
              </Card.Title>
              <Card.Title className={styles.title_clube}>
                Classical sports meets iconic style
              </Card.Title>

              <Link href="" className={styles.Button}>
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>
        <SwiperSlide className={styles.club_item}>
          <Card className={styles.product_card}>
            <Card.Img variant="top" src="/test_for_woman_deccounte3.WebP" />
            <Card.Body className={styles.card}>
              <Card.Title className={styles.title_clube}>
                Women&apos;s slide slippers
              </Card.Title>
              <Card.Title className={styles.title_clube}>
                Classical sports meets iconic style
              </Card.Title>

              <Link href="" className={styles.Button}>
                SHOP NOW
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default Discound_section;
