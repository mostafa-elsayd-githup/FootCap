"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faClockRotateLeft,
  faCreditCard,
  faArrowRotateLeft,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faTruck,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./page.module.css";
import { Card } from "react-bootstrap";
import ShoppingButton from "./actionButton";
import { useOpneing } from "@/RTK/storcontext";
export default function Products({ fillWidth, product }) {
  const { selectedSize, setselectedSize, setAddToCart } = useOpneing();
  const oldprice = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(product?.oldprice));

  const price = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(product?.price));
  let discount = 0;
  if (product?.oldprice && product.price) {
    discount =
      ((parseInt(product.oldprice) - parseInt(product.price)) /
        parseInt(product.oldprice)) *
      100;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageGallery}>
          <div className={styles.imageContainer}>
            <Card.Img
              src={product.image}
              className={styles.mainImage}
              alt={product.name}
            />
          </div>

          <div className={styles.imageContainer}>
            {product.image_Hover ? (
              <Card.Img
                src={product.image_Hover}
                className={styles.mainImage}
                alt={product.name}
              />
            ) : null}
          </div>

          <div className={styles.imageContainer}>
            {product.image3 ? (
              <Card.Img
                src={product.image3}
                className={styles.mainImage}
                alt={product.name}
              />
            ) : product.video ? (
              <video
                src={product.video}
                className={styles.mainImage}
                autoPlay
                muted
                loop
              />
            ) : null}
          </div>

          <div className={styles.imageContainer}>
            {product.image4 && (
              <Card.Img
                src={product.image4}
                className={styles.mainImage}
                alt={product.name}
              />
            )}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.headerInfo}>
            <h1 className={styles.productName}>{product.title}</h1>
            {product.oldprice ? (
              <span>
                <span className={styles.price_red}>{price}</span>
                <span className={styles.old_price}> {oldprice}</span>
              </span>
            ) : (
              <p className={styles.price}> {price}</p>
            )}
            {discount > 0 ? (
              <span className={styles.dis}>{Math.round(discount)} %</span>
            ) : null}
            <div className={styles.colors_available}>
              {product?.url?.length} colours available
            </div>
            <div className={styles.smil_image}>
              {product?.url.map((item) => {
                return (
                  <span key={item.id}>
                    <Image
                      src={item.img_url}
                      alt="Logo"
                      width={70}
                      height={70}
                    />
                  </span>
                );
              })}
            </div>
          </div>
          <div className={styles.sizeSection}>
            <h3 className={styles.sectionTitle}>Select Size</h3>
            <div className={styles.sizeGrid}>
              {product?.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeBox} ${selectedSize === size ? styles.activeSize : ""}`}
                  onClick={() => {
                    if (selectedSize === size) {
                      setselectedSize(null);
                      setAddToCart(false);
                    } else {
                      setselectedSize(size);
                      setAddToCart(true);
                    }
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <ShoppingButton product={product}  />

          <div className={styles.ratingWrapper}>
            <div className={styles.starsContainer}>
              <div className={styles.starsEmpty}>★★★★★</div>

              <div
                className={styles.starsFilled}
                style={{ width: `${fillWidth}%` }}
              >
                ★★★★★
              </div>
            </div>

            <span className={styles.ratingText}>
              [ {product.rating} ]
              <span className={styles.reviewsCount}>
                ({product.watchde || 0} reviews)
              </span>
            </span>
          </div>
          {/* description */}
          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>{product.description}</h3>
          </div>
          <div className={styles.trustSection}>
            <div className={styles.trustItem}>
              <FontAwesomeIcon className={styles.icnodis} icon={faTruck} />
              <span className={styles.trustText}>
                Free Delivery over EGP 999
              </span>
            </div>

            <div className={styles.trustItem}>
              <FontAwesomeIcon
                className={styles.icnodis}
                icon={faClockRotateLeft}
              />
              <span className={styles.trustText}>
                Hassle Free 30 days returns
              </span>
            </div>

            <div className={styles.trustItem}>
              <FontAwesomeIcon className={styles.icnodis} icon={faCreditCard} />
              <span className={styles.trustText}>
                Cash On Delivery Available : Standard courier delivery (4 to 5
                days).
              </span>
            </div>
            <div className={styles.trustItem}>
              <FontAwesomeIcon icon={faLock} className={styles.icnodis} />
              <span className={styles.trustText}>Secure transactions</span>
            </div>
            <div className={styles.trustItem}>
              <FontAwesomeIcon
                className={styles.icnodis}
                icon={faArrowRotateLeft}
              />
              <span className={styles.trustText}>
                ValU: Up to 3 months, 0% Interest
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
