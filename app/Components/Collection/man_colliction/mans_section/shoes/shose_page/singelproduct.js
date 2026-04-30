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
import { useOpneing } from "../../../../../../RTK/storcontext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SingleProduct = ({ productItem, isfevorite }) => {
  // console.log(productItem.url);
  const Router = useRouter();
  const [currentImg, setCurrentImg] = useState(productItem.image);
  const initialState = { message: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handleAction,
    initialState,
  );
  const [actionTypeState, setActionTypeState] = useState("");
  const { setIsOpen, setSelectedProduct, setisfevorite, setselectedSize } =
    useOpneing();

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
  useEffect(() => {
    if (state?.wishliststate !== undefined && state?.wishliststate !== null) {
      setisfevorite(state.wishliststate);

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
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
  }, [state?.wishliststate, setisfevorite]);
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
          onClick={() => {
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
        <form
          onClick={(e) => e.stopPropagation()}
          action={formAction}
          className={styles.action_icon}
        >
          <button
            type="submit"
            disabled={pending}
            onMouseDown={() => setActionTypeState("wishlist")} // بنحدد النوع بس
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: isfevorite ? "#ff4d4d" : "#000", // تغيير اللون لو هو مفضل
              opacity: pending ? 0.5 : 1,
              transition: "all 0.3s ease",
            }}
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={isfevorite ? fasHeart : farHeart}
            />
          </button>

          <button
            disabled={pending}
            onMouseDown={() => {
              setActionTypeState("eye");
              if (!pending) {
                Router.push(`/Components/Collection/man_colliction/mans_section/shoes/${productItem.id}`);
              }
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
            <FontAwesomeIcon icon={faEye} className={styles.icon} />
          </button>
          {/*data for ActionFile*/}
          <input type="hidden" name="id" value={productItem.id || ""} />
          <input type="hidden" name="image" value={productItem?.image || ""} />
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
          <input type="hidden" name="name" value={productItem.name || ""} />
          <input type="hidden" name="price" value={productItem.price || ""} />
          {productItem.sizes?.map((item, index) => (
            <input key={index} type="hidden" name="sizes" value={item || ""} />
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
        </form>
      </div>

        {/* <Link href={`/Components/Hero/${productItem.id}`}> */}
        {/* </Link> */}
      <div style={{ position: "relative" }}>
          <Card.Img
            name="image"
            variant="top"
            src={currentImg}
            alt={productItem.description}
            onMouseEnter={() => setCurrentImg(productItem.image_Hover)}
            className={styles.image}
          />
        {productItem.oldPrice && (
          <span className={styles.dis}>{productItem.dis} %</span>
        )}
      </div>
      {productItem.url && productItem.url.length > 0 && (
        <div className={styles.small_products}>
          {productItem.url.map((style) => (
            <div key={style.id} className={styles.small_img}>
              <Link href={`/Components/Collection/man_colliction/mans_section/shoes/${style.id}`}>
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
        <Link href={`/Components/Collection/man_colliction/mans_section/shoes/${productItem.id}`}>
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
