"use client";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./section3.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
function Section3() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن بالملي ثانية
      once: true, // الأنميشن يشتغل مرة واحدة بس وأنت نازل
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.discound_section}>
      <h1 className={styles.title}>Discound</h1>
      <div data-aos="fade-up" className={styles.clubs}>
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          className="mySwiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000, // 4 ثواني
            disableOnInteraction: false, // عشان لو المستخدم لمس الكارد ميتوقفش التقليب
          }}
        >
          <Swiper spaceBetween={20} slidesPerView={"auto"}>
            <SwiperSlide className={styles.club_item}>
              <Card className={styles.product_card}>
                <Card.Img
                  variant="top"
                  src="https://assets.adidas.com/images/w_450,f_auto,q_auto/f3174714b5cd44b98340a9ac00042f87_9366/G27627_00_plp_standard.jpg"
                />
                <Card.Body className={styles.card}>
                  <h5 className={styles.name}>ADILETTE SHOWER SLIDES</h5>
                  <span className={styles.prise}>EGP 1,349.25</span>
                  <Link href="" className={styles.disception}>
                    Kids 4-8 Years Sportswear
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>

            <SwiperSlide className={styles.club_item}>
              <Card className={styles.product_card}>
                <Card.Img
                  variant="top"
                  src="https://assets.adidas.com/images/w_450,f_auto,q_auto/db47e3bdf8d64cf19371ae8a0037439a_9366/GW6422_00_plp_standard.jpg"
                />
                <Card.Body className={styles.card}>
                  <h5 className={styles.name}>
                    Tensaur Sport Training Lace Shoes
                  </h5>
                  <span className={styles.prise}>EGP 2,799.00</span>
                  <Link href="" className={styles.disception}>
                    Kids 4-8 Years Sportswear
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide className={styles.club_item}>
              <Card className={styles.product_card}>
                <Card.Img
                  variant="top"
                  src="https://assets.adidas.com/images/w_450,f_auto,q_auto/87d9ca0826e344bc82f3aaf50115e2bc_9366/F35556_00_plp_standard.jpg"
                />
                <Card.Body className={styles.card}>
                  <h5 className={styles.name}>Adilette Aqua Slides Kids</h5>
                  <span className={styles.prise}>EGP 1,599.00</span>
                  <Link href="" className={styles.disception}>
                    Kids 4-8 Years Sportswear
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide className={styles.club_item}>
              <Card className={styles.product_card}>
                <Card.Img
                  variant="top"
                  src="https://assets.adidas.com/images/w_450,f_auto,q_auto/647c700ff8bd4aec99f2ae8c01720810_9366/GW6424_00_plp_standard.jpg"
                />
                <Card.Body className={styles.card}>
                  <h5 className={styles.name}>
                    Tensaur Sport Training Lace Shoes
                  </h5>
                  <span className={styles.prise}>EGP 2,799.00</span>
                  <Link href="" className={styles.disception}>
                    Kids 4-8 Years Sportswear
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide className={styles.club_item}>
              <Card className={styles.product_card}>
                <Card.Img
                  variant="top"
                  src="/al_ahly_shart_section3_kids.svg"
                />
                <Card.Body className={styles.card}>
                  <h5 className={styles.name}>
                    AL AHLY 2024 HOME JERSEY YOUTH
                  </h5>
                  <span className={styles.prise}>EGP 2,279.40</span>
                  <Link href="" className={styles.disception}>
                    Youth 8-16 Years Football
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide className={styles.club_item}>
              <Card className={styles.product_card}>
                <Card.Img variant="top" src="/shart_section3_kids.svg" />
                <Card.Body className={styles.card}>
                  <h5 className={styles.name}>
                    Essentials 3-Stripes Cotton Tee
                  </h5>
                  <span className={styles.prise}>EGP 979.30</span>
                  <Link href="" className={styles.disception}>
                    Youth 8-16 Years Sportswear
                  </Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Swiper>
      </div>
    </div>
  );
}
export default Section3;
