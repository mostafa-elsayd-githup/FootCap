"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faClockRotateLeft,
  faCreditCard,
  faArrowRotateLeft,
  faLock,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faTruck,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./page.module.css";
import { useActionState, useEffect } from "react";
import handelAction from "./ActionFile";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useOpneing } from "../../../../../../RTK/storcontext";
import Swal from "sweetalert2";
export default function Products({ fillWidth, product, isfevorite }) {
  const Router = useRouter();
  
  const initialState = { massage: "", state: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    initialState,
  );
  const { setisfevorite } = useOpneing();
  const [actionTypeState, setActionTypeState] = useState("");
  const [selectedSize, setselectedSize] = useState("");
  const [AddToCart, setAddToCart] = useState(false);
  useEffect(() => {
    if (state?.state === 401) {
      redirect("/register");
    }
  }, [state, Router]);
  useEffect(() => {
    if (state?.wishliststate !== undefined && state?.wishliststate !== null) {
      setisfevorite(state.wishliststate);

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
      });

      Toast.fire({
        icon: "success",
        title: state.wishlistmessage,
      });
    }
  }, [state?.wishliststate, state?.wishlistmessage, setisfevorite]);
  useEffect(() => {
    if (state?.cardState !== undefined && state?.cardState !== null) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      const isquantityUpdata = state.type === "quantity";
      Toast.fire({
        icon: "success",
        title: isquantityUpdata ? "quintity +1" : "Added to Cart",
      });   
      console.log("yes");
      setisfevorite(false)
         
    }
  }, [setisfevorite, state?.cardState, state.timeStamp, state.type]);
  return (
    <>
      {/* loader */}
      {pending && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.imageGallery}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              className={styles.mainImage}
              alt={product.name}
            />
          </div>

          <div className={styles.imageContainer}>
            {product.image_Hover ? (
              <img
                src={product.image_Hover}
                className={styles.mainImage}
                alt={product.name}
              />
            ) : null}
          </div>

          <div className={styles.imageContainer}>
            {product.image3 ? (
              <img
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
              <img
                src={product.image4}
                className={styles.mainImage}
                alt={product.name}
              />
            )}
          </div>
        </div>

        {/* product*/}
        <div className={styles.infoSection}>
          <div className={styles.headerInfo}>
            <h1 className={styles.productName}>{product.name}</h1>
            {product.oldPrice ? (
              <span>
                <span className={styles.price}>EGP {product.price}</span>
                <span className={styles.oldPrice}>EGP {product.oldPrice}</span>
              </span>
            ) : (
              <p className={styles.price}>EGP {product.price}</p>
            )}
            <div className={styles.colors_available}>
              {product.url.length} colours available
            </div>
            <div className={styles.smil_image}>
              {product.url.map((item) => {
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

          {/* sizes*/}
          <div className={styles.sizeSection}>
            <h3 className={styles.sectionTitle}>Select Size</h3>
            <div className={styles.sizeGrid}>
              {product.sizes.map((size) => (
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

            <span style={{ color: "red", fontSize: "1rem" }}>
              {state?.sizemessage}
            </span>
          </div>

          {/* actions */}
          <div className={styles.actions}>
            <form
              className={styles.icons}
              onClick={(e) => e.stopPropagation()}
              action={formAction}
            >
              {/*data for ActionFile*/}
              <input type="hidden" name="id" value={product.id || ""} />
              <input type="hidden" name="image" value={product.image || ""} />
              <input type="hidden" name="dis" value={product.dis || ""} />
              <input type="hidden" name="name" value={product.name || ""} />
              <input type="hidden" name="price" value={product.price || ""} />
              <input type="hidden" name="size" value={selectedSize || ""} />
              <input
                type="hidden"
                name="category"
                value={product.category || ""}
              />
              <input
                type="hidden"
                name="actiontype"
                value={actionTypeState || ""}
              />
              <button
                className={styles.addToCartBtn}
                type="submit"
                onMouseDown={() => setActionTypeState("card")}
              >
                ADD TO BAG
                <span className={styles.arrowIcon}>
                  <FontAwesomeIcon icon={faRightLong} />
                </span>
              </button>
              {/* <button
                className={styles.wishlistBtn}
                type="submit"
                onMouseDown={() => {
                  setActionTypeState("wishlist");
                  setisfevorite(!isfevorite);
                }}
              >
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={isfevorite ? fasHeart : farHeart}
                />
              </button> */}
              <button
                className={styles.wishlistBtn}
                type="submit"
                disabled={pending}
                onMouseDown={() => setActionTypeState("wishlist")}
              >
                <FontAwesomeIcon
                  className={styles.icon}
                  // استخدم الحالة اللي جاية من الـ Context عشان تفضل متزامنة
                  icon={isfevorite ? fasHeart : farHeart}
                />
              </button>
            </form>
          </div>

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
        <div></div>
      </div>
    </>
  );
}
