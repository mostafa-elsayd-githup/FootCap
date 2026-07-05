"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import styles from "./what_is_hot.module.css"; 
import { Card } from "react-bootstrap";

export default function WhatIsHot() {
  return (
    <div className={styles.comtainer}>
      <h2 className={styles.head}>WHAT&apos;S HOT</h2>
      
      <div className={styles.contente}>
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
            <div className={styles.card}>
              <Card.Img className={styles.img} src="/Hot3.WebP" alt="Jacket" />
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.title}>Terrex XPERIOR Jackets</h3>
                  <p className={styles.prag}>Cold out? Grab these first.</p>
                </div>
                <Link
                  href="/jackets"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.club_item}>
            <div className={styles.card}>
              <Card.Img className={styles.img} src="/Hot2.WebP" alt="Terrex" />
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.title}>SKYCHASER AX5 GTX</h3>
                  <p className={styles.prag}>Made to do more.</p>
                </div>
                <Link
                  href="/terrex"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide className={styles.club_item}>
            <div className={styles.card}>
              <Card.Img className={styles.img} src="/Hot1.WebP" alt="Simpsons" />
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.title}>The Simpsons</h3>
                  <p className={styles.prag}>Home is where fun lives.</p>
                </div>
                <Link
                  href="/simpsone"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}