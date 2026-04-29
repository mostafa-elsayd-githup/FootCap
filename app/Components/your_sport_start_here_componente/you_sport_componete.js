"use client";
import Link from "next/link";
import { Card } from "react-bootstrap";
import styles from "./you_sport_componete.module.css";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
function SportComponete() {
  return (
    <div data-aos="fade-up" className={styles.container}>
      <h1 className={styles.title}>Your sport starts here..?</h1>
      <div className={styles.clubs}>
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
            <Card className={styles.product_card}>
              <Card.Img variant="top" src="/run.svg" alt="Running gear" />
            </Card>
              <div>
                <Link
                  href="/Components/your_sport_start_here_componente/running/running_page"
                  className={styles.button}
                >
                  Running
                </Link>
              </div>
          </SwiperSlide>
          <SwiperSlide className={styles.club_item}>
            <Card className={styles.product_card}>
              <Card.Img variant="top" src="/footbal.svg" alt="FootBall" />
            </Card>
              <div>
                <Link
                  href="/Components/your_sport_start_here_componente/football/football_page"
                  className={styles.button}
                >
                  FootBall
                </Link>
              </div>
          </SwiperSlide>
          <SwiperSlide className={styles.club_item}>
            <div className={styles.product_card}>
              <Card.Img variant="top" src="/gem.svg" alt="Gym"  />
            </div>
              <div>
                <Link
                  href="/Components/your_sport_start_here_componente/gym/gym_page"
                  className={styles.button}
                >
                  Gym
                </Link>
              </div>
          </SwiperSlide>
          <SwiperSlide className={styles.club_item}>
            <div className={styles.product_card}>
              <Card.Img variant="top" src="/tenes.svg" alt="Tennis" />
            </div>
              <div>
                <Link
                  href="/Components/your_sport_start_here_componente/tennis/tennis_page"
                  className={styles.button}
                >
                  Tennis
                </Link>
              </div>
          </SwiperSlide>
          <SwiperSlide className={styles.club_item}>
            <Card className={styles.product_card}>
              <Card.Img variant="top" src="/basctball.svg" alt=" Basket ball" />
            </Card>
              <div>
                <Link
                  href="/Components/your_sport_start_here_componente/basket_ball/baskit_page"
                  className={styles.button}
                >
                  Basket ball
                </Link>
              </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default SportComponete;
