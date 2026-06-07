"use client";
import styles from "./minidrowp.module.css";
import { Card } from "react-bootstrap";
import { useOpneing } from "@/RTK/storcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import handelAction from "./miniaction";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addToCartOptimistic, removeFromCartOptimistic } from "@/RTK/cardslice";
import { toggleWishlistOptimistic } from "@/RTK/wishlistslice";
export default function MiniDrowp() {
  const Router = useRouter();
  const dispatch = useDispatch();

  const { isOpen, setIsOpen, selectedProduct, setisfevorite } = useOpneing();

  const initialState = { massage: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    initialState,
  );
  const [actionTypeState, setActionTypeState] = useState("");
  const [selectedSize, setselectedSize] = useState("");
  const [AddToCart, setAddToCart] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isfevorite = wishlistItems.some(
    (item) => Number(item.id) === Number(selectedProduct?.id),
  );

  const handleaddedtocard = async () => {
    setActionTypeState("card");
    setLastTimestamp(Date.now());
    const productWithCartId = {
      ...selectedProduct,
      id: `${selectedProduct.id}-${selectedSize}`,
    };
    dispatch(addToCartOptimistic(productWithCartId));
  };
  const handlewishlist = async () => {
    setActionTypeState("wishlist");
    setLastTimestamp(Date.now());
    dispatch(toggleWishlistOptimistic(selectedProduct));
  };
  const handleViewProductButton = async () => {
    if (state?.tokenstate === 401) {
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
    } else {
      redirect(`/product/${selectedProduct.id}`);
    }
  };

  useEffect(() => {
    setActionTypeState("");
  }, [selectedProduct]);

  useEffect(() => {
    if (state?.tokenstate === 401) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to continue. Redirecting...",
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          Router.replace("/register");
        },
      });
      return;
    }

    if (
      actionTypeState === "wishlist" &&
      state?.wishliststate !== undefined &&
      state?.wishliststate !== null &&
      state?.timeStamp > lastTimestamp
    ) {
      console.log(state.wishliststate);
      setActionTypeState("");

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 1000,
      });
      Toast.fire({
        icon: "success",
        title: state.wishliststate
          ? "Added to Wishlist "
          : "Removed from Wishlist",
      });
      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 200);
    }
    if (
      actionTypeState === "card" &&
      state?.cardState !== undefined &&
      state?.cardState !== null &&
      state?.timeStamp > lastTimestamp
    ) {
      setActionTypeState("");
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      const isquantityUpdata = state.type === "quantity";

      Toast.fire({
        icon: "success",
        title: isquantityUpdata ? "quantity +1" : "Added to Cart",
      });

      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 200);
    }

    if (state?.status === 500) {
      if (actionTypeState === "wishlist") {
        dispatch(rollbackWishlist(selectedProduct));
      } else if (actionTypeState === "card") {
        dispatch(removeFromCartOptimistic(selectedProduct.id));
      }

      Swal.fire({
        title: "Error",
        text: state.message || "Something went wrong",
        icon: "error",
      });
    }
  }, [
    state,
    actionTypeState,
    lastTimestamp,
    Router,
    setisfevorite,
    setIsOpen,
    selectedProduct,
    dispatch,
  ]);
  const oldprice = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(selectedProduct?.oldPrice));
  const price = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(selectedProduct?.price));
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.activeOverlay : ""}`}>
      {pending && (
        <div className={styles.overlayaction}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}
      {selectedProduct && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.activeOverlay : ""}`}
          onClick={() => setIsOpen(false)}
        >
          <div key={selectedProduct.id} className={styles.container}>
            <div className={styles.imageGallery}>
              <div className={styles.imageContainer}>
                <Card.Img
                  src={selectedProduct.image}
                  className={styles.mainImage}
                  alt={selectedProduct.name}
                />
              </div>

              <div className={styles.imageContainer}>
                {selectedProduct.image_Hover ? (
                  <Card.Img
                    src={selectedProduct.image_Hover}
                    className={styles.mainImage}
                    alt={selectedProduct.name}
                  />
                ) : null}
              </div>

              <div className={styles.imageContainer}>
                {selectedProduct.image3 ? (
                  <Card.Img
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
                  <Card.Img
                    src={selectedProduct.image4}
                    className={styles.mainImage}
                    alt={selectedProduct.name}
                  />
                )}
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.headerInfo}>
                <h1 className={styles.productName}>{selectedProduct.title}</h1>
                {selectedProduct.oldPrice ? (
                  <span>
                    <span className={styles.price_red}>{price}</span>
                    <span className={styles.oldPrice}>{oldprice}</span>
                  </span>
                ) : (
                  <p className={styles.price}>{price}</p>
                )}
                <div className={styles.colors_available}>
                  {selectedProduct.url?.length} colours available
                </div>
              </div>
              <div className={styles.sizeSection}>
                <h3 className={styles.sectionTitle}>Select Size</h3>
                <div className={styles.sizeGrid}>
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeBox} 
                    ${selectedSize === size ? styles.activeSize : ""}`}
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
                  {state ? (
                    <span className="text-(--color-sale) w-36 content-center">
                      {state?.message}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className={styles.actions}>
                <Link
                  className={styles.View_ProductBtn}
                  href={``}
                  onClick={handleViewProductButton}
                >
                  View Product
                  <span className={styles.arrowIcon}>
                    <FontAwesomeIcon icon={faRightLong} />
                  </span>
                </Link>
                <form className={styles.icons} action={formAction}>
                  <>
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
                      name="name"
                      value={selectedProduct.title || ""}
                    />
                    <input
                      type="hidden"
                      name="dis"
                      value={selectedProduct.dis || ""}
                    />
                    <input
                      type="hidden"
                      name="price"
                      value={selectedProduct.price || ""}
                    />
                    <input
                      type="hidden"
                      name="size"
                      value={selectedSize || ""}
                    />
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
                  </>
                  <button
                    className={`${styles.addToCartBtn} ${AddToCart === false ? styles.activeBut : ""}`}
                    type="submit"
                    onClick={handleaddedtocard}
                  >
                    ADD TO BAG
                    <span className={styles.arrowIcon}>
                      <FontAwesomeIcon icon={faRightLong} />
                    </span>
                  </button>
                  <button
                    className={styles.wishlistBtn}
                    type="submit"
                    disabled={pending}
                    onClick={handlewishlist}
                    style={{ opacity: pending ? 0.5 : 1 }}
                  >
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={isfevorite ? fasHeart : farHeart}
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
