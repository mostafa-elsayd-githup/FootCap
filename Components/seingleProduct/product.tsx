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
import handleAction from "@/server/hero_server";
import { useOpneing } from "@/RTK/storcontext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlistOptimistic,
  rollbackWishlist,
} from "@/RTK/wishlistslice";
const SingleProduct = ({ productItem }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [currentImg, setCurrentImg] = useState(productItem.image);
  const initialState = { message: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handleAction,
    initialState,
  );
  const [actionTypeState, setActionTypeState] = useState("");
  const { setIsOpen, setSelectedProduct, setisfevorite } = useOpneing();
  let wishlistItems = useSelector((state) => state.wishlist.items);
  const isfevorite = wishlistItems.some(
    (item: { id: number }) => Number(item.id) === productItem.id,
  );
  const handleWishlistSubmit = async () => {
    setActionTypeState("wishlist");
    dispatch(toggleWishlistOptimistic(productItem));

    if (state?.status === 500) {
      dispatch(rollbackWishlist(productItem));

      Swal.fire({
        title: "Error",
        text: state.message,
        icon: "error",
      });
    }
  };
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
    if (state?.wishliststate !== undefined && state?.wishliststate !== null) {
      setisfevorite(state.wishliststate);

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: state.wishliststate
          ? "Added to Wishlist"
          : "Removed from Wishlist",
      });
    }
  }, [state.wishliststate, setisfevorite, state?.state, Router]);

  if (productItem?.oldPrice) {
    var discount =
      ((parseInt(productItem.oldPrice) - parseInt(productItem.price)) /
        parseInt(productItem.oldPrice)) *
      100;
  }
  const oldprice = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(productItem.oldPrice));
  const price = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(productItem.price));

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
      <div className={styles.icons}>
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setSelectedProduct(productItem);
          }}
        >
          <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
        </button>
        <form action={formAction} className={styles.action_icon}>
          <button
            type="submit"
            disabled={pending}
            onClick={handleWishlistSubmit}
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={isfevorite ? fasHeart : farHeart}
            />
          </button>

          <button
            disabled={pending}
            type="button"
            onClick={() => {
              setActionTypeState("eye");
              if (!pending) {
                Router.push(`/product/${productItem.id}`);
              }
            }}
          >
            <FontAwesomeIcon icon={faEye} className={styles.icon} />
          </button>
          <>
            <input type="hidden" name="id" value={productItem.id || ""} />
            <input
              type="hidden"
              name="image"
              value={productItem?.image || ""}
            />
            <input
              type="hidden"
              name="image_Hover"
              value={productItem?.image_Hover || ""}
            />
            {productItem.url?.map((item, index) => (
              <input
                key={index}
                type="hidden"
                name="image_url"
                value={item || ""}
              />
            ))}
            <input
              type="hidden"
              name="video"
              value={productItem.image3 || productItem.video || ""}
            />
            <input
              type="hidden"
              name="image4"
              value={productItem?.image4 || ""}
            />
            <input type="hidden" name="dis" value={productItem.dis || ""} />
            <input type="hidden" name="name" value={productItem.title || ""} />
            <input type="hidden" name="price" value={productItem.price || ""} />
            <input
              type="hidden"
              name="old_price"
              value={productItem.oldPrice || ""}
            />
            {productItem.sizes?.map((item, index) => (
              <input
                key={index}
                type="hidden"
                name="sizes"
                value={item || ""}
              />
            ))}
            <input
              type="hidden"
              name="category"
              value={productItem.category || ""}
            />
            <input
              type="hidden"
              name="actiontype"
              value={actionTypeState || ""}
            />
          </>
        </form>
      </div>
      <div style={{ position: "relative" }}>
        <Card.Img
          title="image"
          variant="top"
          src={currentImg}
          alt={productItem.description}
          onMouseEnter={() => setCurrentImg(productItem.image_Hover)}
          className={styles.image}
        />
        {productItem?.oldPrice ? (
          <span className={styles.dis}>{parseInt(discount)} %</span>
        ) : null}
      </div>
      {productItem.url && productItem.url.length > 0 ? (
        <div className={styles.small_products}>
          {productItem?.url.map((style:any) => (
            <div key={style.id} className={styles.small_img}>
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
        <Link href={`/product/${productItem.id}`}>
          <h5 className={styles.name}>{productItem.title}</h5>
        </Link>
        <span
          className={`${styles.price} ${
            productItem.oldPrice ? styles.price_red : ""
          }`}
        >
          {price}
        </span>

        {productItem.oldPrice ? (
          <span className={styles.old_price}>{oldprice}</span>
        ) : null}
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
