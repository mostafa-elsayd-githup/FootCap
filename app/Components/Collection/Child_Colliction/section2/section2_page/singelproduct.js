"use client";
import { useActionState, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; // Regular heart icon
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart icon
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import handleAction from "./ActionFile";
const SingleProduct = ({ productItem, isfevorite}) => {

  const [currentImg, setCurrentImg] = useState(productItem.image);
  const initialState = { message: "", status: null };
  const [state, formAction, pending] = useActionState(
    handleAction,
    initialState,
  );
  const [actionTypeState, setActionTypeState] = useState("");
  const productId = productItem.id || "unknown";
  return (
    <Card
      className={styles.card}
      onMouseLeave={() => setCurrentImg(productItem.image)}
    >
      {/* loader */}
      {pending && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}

      <form
        className={styles.icons}
        onClick={(e) => e.stopPropagation()}
        action={formAction}
      >
        
        {/*data for ActionFile*/}
        <input type="hidden" name="id" value={productItem.id} />
        <input type="hidden" name="image" value={productItem.image} />
        <input type="hidden" name="dis" value={productItem.dis} />
        <input type="hidden" name="name" value={productItem.name} />
        <input type="hidden" name="price" value={productItem.price} />
        <input type="hidden" name="sizes" value={productItem.sizes} />
        <input type="hidden" name="category" value={productItem.category} />
        <input type="hidden" name="actiontype" value={actionTypeState} />
        <button
          type="submit"
          disabled={pending}
          onMouseDown={() => setActionTypeState("wishlist")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#000",
            opacity: pending ? 0.1 : 1,
          }}
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={isfevorite ? fasHeart : farHeart}
          />
        </button>
        <button
          type="submit"
          disabled={pending}
          onMouseDown={() => setActionTypeState("cart")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#000",
            opacity: pending ? 0.1 : 1,
          }}
        >
          <FontAwesomeIcon
            icon={faBagShopping}
          />
        </button>
      </form>

      <div style={{ position: "relative" }}>
        <Link href={`/Components/Hero/${productId}`}>
          <Card.Img
            name="image"
            variant="top"
            src={currentImg}
            alt={productItem.description}
            // عند الوقوف بالماوس، نغير الصورة لهذا الكارت فقط
            onMouseEnter={() => setCurrentImg(productItem.image_Hover)}
            // عند خروج الماوس، نرجع الصورة الأصلية
            className={styles.image}
          />
        </Link>
        {productItem.oldPrice && (
          <span className={styles.dis}>{productItem.dis} %</span>
        )}
      </div>
      {productItem.url && productItem.url.length > 0 && (
        <div className={styles.small_products}>
          {productItem.url.map((style, index) => (
            <div key={style.id + index} className={styles.small_img}>
              <Link href={`/Components/Collection/${productItem.id}`}>
                <Card.Img
                  variant="top"
                  src={style.img_url}
                  onMouseEnter={() => setCurrentImg(style.img_url)}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
      <Card.Body>
        <Link href={`/Components/Hero/${productItem.id}`}>
          <h5 className={styles.name}>{productItem.name}</h5>
        </Link>
        {/* السعر الأساسي */}
        <span
          className={`${styles.price} ${
            productItem.oldPrice ? styles.price_red : ""
          }`}
        >
          EGP {productItem.price}
        </span>
        {/* السعر القديم (يظهر فقط إذا وجد) */}
        {productItem.oldPrice && (
          <>
            <span className={styles.old_price}>EGP {productItem.oldPrice}</span>
            <input
              type="hidden"
              name="old_price"
              value={productItem.oldPrice}
            />
          </>
        )}
        <p className={styles.category}>{productItem.category}</p>
        <p className={styles.colors}>
          {productItem.url.length ? `Colors: ${productItem.url.length}` : ""}
        </p>
        <p className={styles.made}>
          {productItem.made ? productItem.made : ""}
        </p>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
