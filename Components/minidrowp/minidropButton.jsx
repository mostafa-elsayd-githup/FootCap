"use client";
import styles from "./minidrowp.module.css";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handelAction from "@/Components/minidrowp/miniaction";
import { useActionState, useEffect, useState } from "react";
import { useOpneing } from "@/RTK/storcontext";
import { useDispatch, useSelector } from "react-redux";
import { addToCartOptimistic, removeFromCartOptimistic } from "@/RTK/cardslice";
import {
  rollbackWishlist,
  toggleWishlistOptimistic,
} from "@/RTK/wishlistslice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function Buttons() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    setIsOpen,
    selectedProduct,
    AddToCart,
    setAddToCart,
    selectedSize,
    setselectedSize,
  } = useOpneing();
  const initialState = { massage: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    initialState,
  );
  const [actionTypeState, setActionTypeState] = useState("");
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isfevorite = wishlistItems.some(
    (item) => Number(item.id) === Number(selectedProduct?.id),
  );

  const handleaddedtocard = async () => {
    setActionTypeState("card");
    setLastTimestamp(Date.now());
    if (selectedSize && selectedSize?.trim() !== "") {
      const productWithCartId = {
        ...selectedProduct,
        id: `${selectedProduct.id}-${selectedSize}`,
      };
      dispatch(addToCartOptimistic(productWithCartId));
    }
  };
  const handlewishlist = async () => {
    setActionTypeState("wishlist");
    setLastTimestamp(Date.now());
    dispatch(toggleWishlistOptimistic(selectedProduct));
  };

  
  useEffect(() => {
    if (
      actionTypeState === "wishlist" &&
      state?.wishliststate !== undefined &&
      state?.wishliststate !== null &&
      state?.timeStamp > lastTimestamp
    ) {
      toast.success(
        state.wishliststate ? "Added to Wishlist" : "Remove From Wishlist",
        { position: "bottom-left", duration: 1500 },
      );

      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 1500);
    }
    if (
      actionTypeState === "card" &&
      state?.cardState !== undefined &&
      state?.cardState !== null &&
      state?.timeStamp > lastTimestamp
    ) {
      toast.success(state.cardState ? "Quantity +1" : "Added to Cart", {
        position: "bottom-left",
        duration: 1500,
      });

      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 1500);
    }
    if (state?.success === false && state?.timeStamp > lastTimestamp) {
      const sizeError = state?.message?.size?.[0];
      toast.error(sizeError || "Please select a size", {
        position: "bottom-left",
        duration: 1500,
      });
    }

    if (state?.status === 500) {
      if (actionTypeState === "wishlist") {
        dispatch(rollbackWishlist(selectedProduct));
      } else if (actionTypeState === "card") {
        dispatch(removeFromCartOptimistic(selectedProduct.id));
      }
    }
  }, [
    state,
    actionTypeState,
    lastTimestamp,
    dispatch,
    selectedProduct,
    setIsOpen,
    setAddToCart,
    setselectedSize,
  ]);
  return (
    <form className={styles.icons} action={formAction}>
      <button
        className={`${styles.addToCartBtn} ${AddToCart === false ? styles.activeBut : ""}`}
        type="submit"
        onClick={handleaddedtocard}
      >
        {pending ? (
          "ADDing..."
        ) : (
          <>
            ADD TO BAG
            <span className={styles.arrowIcon}>
              <FontAwesomeIcon icon={faRightLong} />
            </span>
          </>
        )}
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
      <input type="hidden" name="actiontype" value={actionTypeState || ""} />
      <input type="hidden" name="id" value={selectedProduct.id || ""} />
      <input type="hidden" name="size" value={selectedSize || ""} />
    </form>
  );
}
