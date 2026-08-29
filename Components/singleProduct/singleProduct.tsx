"use client";
import { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShoppingButton from "./buttonShopping";
import WishlistButton from "./WishlistButton";
const SingleProduct = ({ productItem }) => {
  const Router = useRouter();
  const [currentImg, setCurrentImg] = useState(productItem?.image || "");
  let discount = 0;
  if (productItem?.oldprice && productItem.price) {
    discount =
      ((parseInt(productItem.oldprice) - parseInt(productItem.price)) /
        parseInt(productItem.oldprice)) *
      100;
  }
  const oldprice = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(productItem?.oldprice));
  const price = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(productItem?.price));

  return (
    <>
      <Card
        className={styles.card}
        onMouseLeave={() => setCurrentImg(productItem.image)}
      >
        <div className={styles.icons}>
          <ShoppingButton product={productItem} />
          <div className={styles.action_icon}>
            <WishlistButton favoriteProduct={productItem} />
            <button
              type="button"
              onClick={() => Router.push(`/product/${productItem.id}`)}
            >
              <FontAwesomeIcon icon={faEye} className={styles.icon} />
            </button>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Card.Img
            title="image"
            variant="top"
            src={currentImg}
            alt={productItem?.description}
            onMouseEnter={() => setCurrentImg(productItem.image_Hover)}
            className={styles.image}
          />
          {discount > 0 ? (
            <span className={styles.dis}>{Math.round(discount)} %</span>
          ) : null}
        </div>
        {productItem?.url && productItem?.url.length > 0 ? (
          <div className={styles.small_products}>
            {productItem?.url.map((style: any, index: number) => (
              <div key={index} className={styles.small_img}>
                <Link href={`/product/${style.id}`}>
                  <Card.Img
                    variant="top"
                    src={style.img_url}
                    onMouseEnter={() => setCurrentImg(style.img_url)}
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : null}
        <Card.Body className={styles.card_body}>
          <Link href={`/product/${productItem?.id}`}>
            <h5 className={styles.name}>{productItem?.title}</h5>
          </Link>
          <span
            className={`${styles.price} ${
              productItem?.oldprice ? styles.price_red : ""
            }`}
          >
            {price}
          </span>

          {productItem?.oldprice ? (
            <span className={styles.old_price}>{oldprice}</span>
          ) : null}
          <p className={styles.category}>{productItem?.category}</p>
          <p className={styles.colors}>
            {productItem?.url.length
              ? `Colors: ${productItem?.url.length}`
              : ""}
          </p>
          <p className={styles.made}>
            {productItem?.made ? productItem?.made : ""}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleProduct;
