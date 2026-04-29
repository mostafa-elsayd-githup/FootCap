"use client";
import styles from "./minidrowp.module.css";
import { useOpneing } from "../../../../../RTK/storcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import handelAction, { CheckCookies } from "./miniaction";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
export default function MiniDrowp() {
  const Router = useRouter();
  const { isOpen, setIsOpen, selectedProduct, isfevorite, setisfevorite } =
    useOpneing();
  const initialState = { massage: "", state: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    initialState,
  );
  const [actionTypeState, setActionTypeState] = useState("");
  const [selectedSize, setselectedSize] = useState("");
  const [AddToCart, setAddToCart] = useState(false);
  useEffect(() => {
    if (state?.state === 401) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to continue. Redirecting...",
        icon: "error",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          // <=callback function
          Router.replace("/register");
        },
      });
    }
  }, [state, Router]);
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.activeOverlay : ""}`}>
      {pending && (
        <div className={styles.overlayaction}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}

      {selectedProduct ? (
        <div key={selectedProduct.id} className={styles.container}>
          <div
            className={styles.close}
            onClick={() => setIsOpen(false)}
          >{`>>`}</div>
          <div className={styles.imageGallery}>
            <div className={styles.imageContainer}>
              <img
                src={selectedProduct.image}
                className={styles.mainImage}
                alt={selectedProduct.name}
              />
            </div>

            <div className={styles.imageContainer}>
              {selectedProduct.image_Hover ? (
                <img
                  src={selectedProduct.image_Hover}
                  className={styles.mainImage}
                  alt={selectedProduct.name}
                />
              ) : null}
            </div>

            <div className={styles.imageContainer}>
              {selectedProduct.image3 ? (
                <img
                  src={selectedProduct.image3}
                  className={styles.mainImage}
                  alt={selectedProduct.name}
                />
              ) : selectedProduct.video ? (
                <video
                  src={selectedProduct.video}
                  className={styles.mainImage}
                  autoPlay
                  muted
                  loop
                />
              ) : null}
            </div>

            <div className={styles.imageContainer}>
              {selectedProduct.image4 && (
                <img
                  src={selectedProduct.image4}
                  className={styles.mainImage}
                  alt={selectedProduct.name}
                />
              )}
            </div>
          </div>

          {/* product info*/}
          <div className={styles.infoSection}>
            <div className={styles.headerInfo}>
              <h1 className={styles.productName}>{selectedProduct.name}</h1>
              {selectedProduct.oldPrice ? (
                <span>
                  <span className={styles.price}>
                    EGP {selectedProduct.price}
                  </span>
                  <span className={styles.oldPrice}>
                    EGP {selectedProduct.oldPrice}
                  </span>
                </span>
              ) : (
                <p className={styles.price}>EGP {selectedProduct.price}</p>
              )}
              <div className={styles.colors_available}>
                {selectedProduct.url.length} colours available
              </div>
              <div className={styles.smil_image}>
                {selectedProduct.url.map((item) => {
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
                {selectedProduct.sizes.map((size) => (
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

            {/* actions */}
            <div className={styles.actions}>
              {/* view product button */}
              <Link
                className={styles.View_ProductBtn}
                href={""}
                onClick={async (e) => {
                  e.preventDefault;
                  const ruselt = await CheckCookies();
                  if (ruselt.success) {
                    Router.push(
                      `/Components/what_is_hot_componante/terrex/${selectedProduct.id}`,
                    );
                  } else {
                    Swal.fire({
                      title: "Login Required",
                      text: "Please log in to continue. Redirecting...",
                      icon: "error",
                      timer: 3000,
                      timerProgressBar: true,
                      showConfirmButton: false,
                      willClose: () => {
                        // <= callback function
                        Router.replace("/register");
                      },
                    });
                  }
                }}
              >
                View Product
                <span className={styles.arrowIcon}>
                  <FontAwesomeIcon icon={faRightLong} />
                </span>
              </Link>

              <form
                className={styles.icons}
                onClick={(e) => e.stopPropagation()}
                action={formAction}
              >
                {/*data for ActionFile*/}
                <input
                  type="hidden"
                  name="id"
                  value={selectedProduct.id || ""}
                />
                <input
                  type="hidden"
                  name="image"
                  value={selectedProduct.image || ""}
                />
                <input
                  type="hidden"
                  name="dis"
                  value={selectedProduct.dis || ""}
                />
                <input
                  type="hidden"
                  name="name"
                  value={selectedProduct.name || ""}
                />
                <input
                  type="hidden"
                  name="price"
                  value={selectedProduct.price || ""}
                />
                <input type="hidden" name="size" value={selectedSize || ""} />
                <input
                  type="hidden"
                  name="category"
                  value={selectedProduct.category || ""}
                />
                <input
                  type="hidden"
                  name="actiontype"
                  value={actionTypeState || ""}
                />
                <button
                  className={`${styles.addToCartBtn} `}
                  type="submit"
                  onMouseDown={() => setActionTypeState("card")}
                >
                  ADD TO BAG
                  <span className={styles.arrowIcon}>
                    <FontAwesomeIcon icon={faRightLong} />
                  </span>
                </button>
                <button
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
                </button>
              </form>
            </div>
            <span style={{ color: "red", fontSize: "1rem" }}>
              {state?.message}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
