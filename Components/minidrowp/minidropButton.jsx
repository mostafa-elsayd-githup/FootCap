"use client";
import styles from "./minidrowp.module.css";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handelAction from "@/Components/minidrowp/miniaction";
import { useActionState, useEffect, useRef, useState } from "react";
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

  const initialState = { message: "", wishliststate: null, requestId: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    initialState
  );
  const [actiontypeState, setActiontypeState] = useState("");
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isfevorite = wishlistItems.some(
    (item) => Number(item.id) === Number(selectedProduct?.id)
  );

  const handleaddedtocard = () => {
    setActiontypeState("card");
    if (selectedSize && selectedSize?.trim() !== "") {
      const productWithCartId = {
        ...selectedProduct,
        id: `${selectedProduct.id}-${selectedSize}`,
      };
      dispatch(addToCartOptimistic(productWithCartId));
    }
  };

  const handlewishlist = () => {
    setActiontypeState("wishlist");
    dispatch(toggleWishlistOptimistic(selectedProduct));
  };

  const processedRequestId = useRef(null);

  useEffect(() => {
    if (!state || !state.requestId) return;

    if (processedRequestId.current === state.requestId) return;

    if (state?.success === false) {
      processedRequestId.current = state.requestId;
      const sizeError = state?.message?.size?.[0];
      toast.error(sizeError || "Please select a size", {
        position: "bottom-left",
        duration: 1500,
      });
      return;
    }

    if (state?.state === 401) {
      processedRequestId.current = state.requestId;
      const productData = state.guestProduct;

      if (state.actiontype === "card" && productData) {
        let localcard = JSON.parse(localStorage.getItem("guest_cart")) || [];
        const exists = localcard.some((item) => item.id === productData.id);

        if (exists) {
          localcard = localcard.map((item) =>
            item.id === productData.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
          toast.success("Quantity +1", { position: "bottom-left", duration: 2000 });
        } else {
          localcard = [...localcard, { ...productData, quantity: 1, sizes: selectedSize }];
          toast.success("Added to Cart", { position: "bottom-left", duration: 2000 });
        }
        localStorage.setItem("guest_cart", JSON.stringify(localcard));
        window.dispatchEvent(new Event("guest_cart_updated"));
      } else if (state.actiontype === "wishlist" && productData) {
        let localWishlist = JSON.parse(localStorage.getItem("guest_wishlist")) || [];
        const exists = localWishlist.some((item) => item.id === productData.id);

        if (exists) {
          localWishlist = localWishlist.filter((item) => item.id !== productData.id);
          toast.success("Removed from Wishlist", { position: "bottom-left", duration: 2000 });
        } else {
          localWishlist.push(productData);
          toast.success("Added to Wishlist", { position: "bottom-left", duration: 2000 });
        }
        localStorage.setItem("guest_wishlist", JSON.stringify(localWishlist));
        window.dispatchEvent(new Event("guest_wishlist_updated"));
      }

      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 1200);
      return;
    }

    if (
      state.actiontype === "wishlist" &&
      state?.wishliststate !== undefined &&
      state?.wishliststate !== null
    ) {
      processedRequestId.current = state.requestId;
      toast.success(
        state.wishliststate ? "Added to Wishlist" : "Removed from Wishlist",
        { position: "bottom-left", duration: 1500 }
      );

      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 1500);
      return;
    }

    if (
      state.actiontype === "card" &&
      state?.cardState !== undefined &&
      state?.cardState !== null
    ) {
      processedRequestId.current = state.requestId;
      toast.success(state.cardState ? "Quantity +1" : "Added to Cart", {
        position: "bottom-left",
        duration: 1500,
      });

      setTimeout(() => {
        setIsOpen(false);
        setselectedSize("");
        setAddToCart(false);
      }, 1500);
      return;
    }

    if (state?.status === 500) {
      processedRequestId.current = state.requestId;
      if (state.actiontype === "wishlist") {
        dispatch(rollbackWishlist(selectedProduct));
      } else if (state.actiontype === "card") {
        dispatch(removeFromCartOptimistic(selectedProduct.id));
      }
    }
  }, [
    state,
    dispatch,
    selectedProduct,
    selectedSize,
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
        {pending && actiontypeState === "card" ? (
          "Adding..."
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
      <input type="hidden" name="actiontype" value={actiontypeState || ""} />
      <input type="hidden" name="id" value={selectedProduct?.id || ""} />
      <input type="hidden" name="size" value={selectedSize || ""} />
    </form>
  );
}