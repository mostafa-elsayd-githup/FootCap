"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// 🌟 السطور دي إجبارية عشان الـ Swiper يرص الكروت جنب بعضها ويشغل الأنميشن صح
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
          {/* الكارت الأول */}
          <SwiperSlide className={styles.club_item}>
            <div className={styles.card}>
              <Card className={styles.img} src="/Hot3.svg" alt="Jacket" />
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.title}>Terrex XPERIOR Jackets</h3>
                  <p className={styles.prag}>Cold out? Grab these first.</p>
                </div>
                <Link
                  href="/Components/what_is_hot_componante/jackets/jacket_page?type=Jacket"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* الكارت الثاني */}
          <SwiperSlide className={styles.club_item}>
            <div className={styles.card}>
              <img className={styles.img} src="/Hot2.svg" alt="Terrex" />
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.title}>SKYCHASER AX5 GTX</h3>
                  <p className={styles.prag}>Made to do more.</p>
                </div>
                <Link
                  href="/Components/what_is_hot_componante/terrex/terrex_page?type=terrex"
                  className={styles.button}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* الكارت الثالث */}
          <SwiperSlide className={styles.club_item}>
            <div className={styles.card}>
              <img className={styles.img} src="/Hot1.svg" alt="Simpsons" />
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.title}>The Simpsons</h3>
                  <p className={styles.prag}>Home is where fun lives.</p>
                </div>
                <Link
                  href="/Components/what_is_hot_componante/simpsone/simpsone_page?type=simpsons"
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