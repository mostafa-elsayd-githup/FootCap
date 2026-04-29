"use client";
import styles from "./what_is_hot.module.css";
import { Card } from "react-bootstrap";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // استيراد موديل الاوتو بلاي

function HotCOMPONANTE() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة الأنميشن بالملي ثانية
      once: true, // الأنميشن يشتغل مرة واحدة بس وأنت نازل
    });
  }, []);
  return (
    <div data-aos="fade-up" className={styles.comtainer}>
      <h2 className={styles.head}>WHAT&apos;S HOT</h2>
      <div className={styles.contente}>
        <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        className="mySwiper"
        // 2. فعل الموديلات هنا
        modules={[Autoplay]}
        // 3. ضبط إعدادات الأوتو بلاي
        autoplay={{
          delay: 3000, // 4 ثواني
          disableOnInteraction: false,
        }}
      >
          <SwiperSlide className={styles.club_item}>
            <Card className={styles.card}>
              <Card.Img className={styles.img} variant="top" src="/Hot3.svg" />
              <Card.Body>
                <div>
                  <h3 className={styles.title}>Terrex XPERIOR Jackets</h3>
                  <p className={styles.prag}>Cold out? Grab these first.</p>
                </div>

                <Link
                  href="/Components/what_is_hot_componante/jackets/jacket_page"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </Card.Body>
            </Card>
          </SwiperSlide>

          <SwiperSlide className={styles.club_item}>
            <Card className={styles.card}>
              <Card.Img className={styles.img} variant="top" src="/Hot2.svg" />
              <Card.Body>
                <div>
                  <h3 className={styles.title}>SKYCHASER AX5 GTX</h3>
                  <p className={styles.prag}>Made to do more.</p>
                </div>

                <Link
                  href="/Components/what_is_hot_componante/terrex/terrex_page"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </Card.Body>
            </Card>
          </SwiperSlide>
          <SwiperSlide className={styles.club_item}>
            <Card className={styles.card}>
              <Card.Img className={styles.img} variant="top" src="/Hot1.svg" />
              <Card.Body>
                <div>
                  <h3 className={styles.title}>The Simpsons</h3>
                  <p className={styles.prag}>Home is where fun lives.</p>
                </div>

                <Link
                  href="/Components/what_is_hot_componante/simpsone/simpsone_page"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </Card.Body>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default HotCOMPONANTE;
