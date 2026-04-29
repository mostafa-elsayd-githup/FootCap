"use client";
import { useActionState, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import handleAction from "./ActionFile";
import { useOpneing } from "../../../../RTK/storcontext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const SingleProduct = ({ productItem, isfevorite }) => {
  const Router = useRouter();
  const [currentImg, setCurrentImg] = useState(productItem.image);
  const initialState = { message: "", status: null };
  const [state, formAction, pending] = useActionState(
    handleAction,
    initialState,
  );
  useEffect(() => {
    if (state?.state === 401) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to continue. Redirecting...",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          // <=callback function
          Router.replace("/register");
        },
      });
    }
  });
  const [actionTypeState, setActionTypeState] = useState("");
  const { setIsOpen, setSelectedProduct, setisfevorite } = useOpneing();
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
        <input type="hidden" name="id" value={productItem.id || ""} />
        <input type="hidden" name="image" value={productItem.image || ""} />
        <input type="hidden" name="dis" value={productItem.dis || ""} />
        <input type="hidden" name="name" value={productItem.name || ""} />
        <input type="hidden" name="price" value={productItem.price || ""} />
        <input type="hidden" name="sizes" value={productItem.sizes[0] || ""} />
        <input
          type="hidden"
          name="category"
          value={productItem.category || ""}
        />
        <input type="hidden" name="actiontype" value={actionTypeState || ""} />
        <button
          type="submit"
          disabled={pending}
          onMouseDown={() => {
            setActionTypeState("wishlist");
            setisfevorite(!isfevorite);
          }}
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
          onMouseDown={() => {
            setIsOpen(true);
            setSelectedProduct(productItem);
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#000",
            opacity: pending ? 0.1 : 1,
          }}
        >
          <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
        </button>
        <button
          type="submit"
          disabled={pending}
          onMouseDown={() => setActionTypeState("eye")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#000",
            opacity: pending ? 0.1 : 1,
          }}
        >
          <FontAwesomeIcon icon={faEye} className={styles.icon} />
        </button>
      </form>

      <div style={{ position: "relative" }}>
        <Link
          href={`/Components/your_sport_start_here_componente/tennis/${productItem.id}`}
        >
          <Card.Img
            name="image"
            variant="top"
            src={currentImg}
            alt={productItem.description}
            onMouseEnter={() => setCurrentImg(productItem.image_Hover)}
            className={styles.image}
          />
        </Link>
        {productItem.oldPrice && (
          <span className={styles.dis}>{productItem.dis} %</span>
        )}
      </div>
      {productItem.url && productItem.url.length > 0 && (
        <div className={styles.small_products}>
          {productItem.url.map((style) => (
            <div key={style.id} className={styles.small_img}>
              <Link
                href={`/Components/your_sport_start_here_componente/tennis/${style.id}`}
              >
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
        {productItem.Inventory === 0 ? (
          <span className={styles.little}>
            <span className={styles.word}>OUT</span>
          </span>
        ) : productItem.Inventory <= 5 ? (
          <span className={styles.little}>
            <span className={styles.word}>LOW</span>
          </span>
        ) : null}
        <Link
          href={`/Components/your_sport_start_here_componente/tennis/${productItem.id}`}
        >
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

        {productItem.oldPrice && (
          <>
            <span className={styles.old_price}>EGP {productItem.oldPrice}</span>
            <input
              type="hidden"
              name="old_price"
              value={productItem.oldPrice || ""}
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
