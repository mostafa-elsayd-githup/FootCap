"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  toggleWishlistOptimistic,
  rollbackWishlist,
} from "@/RTK/wishlistslice";
import styles from "./page.module.css";
import { addToCartOptimistic } from "@/RTK/cardslice";
import handelAction from "@/server/dynamicfile_server";
import { useDispatch, useSelector } from "react-redux";
import { useActionState, useState, useEffect } from "react";
import { useOpneing } from "@/RTK/storcontext";
import { toast } from "sonner";
import LoaderTag from "@/Components/loaderFecthing/loaderTofetch";

export default function ShoppingButton({ product }) {
  const [isfevorite, setisfevorite] = useState(false);
  const [actionTypeState, setActionTypeState] = useState("");
  const [LastTimestamp, setlastTimestamp] = useState(null);
  const [LastWishlistTimestamp, setLastWishlistTimestamp] = useState(null);

  const { setselectedSize, selectedSize } = useOpneing();
  const { AddToCart, setAddToCart } = useOpneing();

  const initialState = { message: "", state: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    initialState,
  );

  const dispatch = useDispatch();
  const handleWishlistSubmit = () => {
    setLastWishlistTimestamp(Date.now());
    setActionTypeState("wishlist");
    dispatch(toggleWishlistOptimistic(product));
  };

  const handleaddedtocard = () => {
    if (!selectedSize || selectedSize.trim() === "") {
      setActionTypeState("card");
      setlastTimestamp(Date.now());
      return;
    }
    setActionTypeState("card");
    setlastTimestamp(Date.now());
    const productWithCartId = {
      ...product,
      id: `${product.id}-${selectedSize}`,
    };
    dispatch(addToCartOptimistic(productWithCartId));
  };
useEffect(() => {
    if (actionTypeState === "card" && (!selectedSize || selectedSize.trim() === "")) {
      toast.error("Please select a size"); 
      setActionTypeState("");
      return;
    }

    if (state?.message) {
      const currentAction = state?.actionType || actionTypeState;
      const currentClickTime = currentAction === "card" ? LastTimestamp : LastWishlistTimestamp;

      if (state?.timeStamp > currentClickTime) {
        if (currentAction === "wishlist") {
          dispatch(rollbackWishlist(product));
        }
        
        const errorMsg =
          state?.message?.size?.[0] ||
          state?.message?.actiontype?.[0] ||
          "Validation Error";
          
        toast.error(errorMsg);
      }
      return;
    }
    if (state?.status === 500) {
      if (actionTypeState === "wishlist") {
        dispatch(rollbackWishlist(product));
      }
      toast.error(state.message || "Connection to the server failed.");
      return;
    }
    if (
      actionTypeState === "wishlist" &&
      state?.wishliststate !== undefined &&
      state?.wishliststate !== null &&
      state?.timeStamp > LastWishlistTimestamp
    ) {
      if (state.wishliststate) {
        toast.success("Added to Wishlist");
      } else {
        toast.info("Removed from Wishlist");
      }
      return;
    }
    if (
      actionTypeState === "card" &&
      state?.cardState !== undefined &&
      state?.cardState !== null &&
      state?.timeStamp > LastTimestamp
    ) {
      if (state.cardState) {
        toast.success("Quantity updated (+1)");
      } else {
        toast.success("Added to Cart");
      }

      setTimeout(() => {
        setselectedSize("");
        setAddToCart(false);
      }, 200);
    }
  }, [
    state, 
    actionTypeState, 
    LastTimestamp, 
    LastWishlistTimestamp, 
    selectedSize,
    dispatch, 
    product, 
    setselectedSize, 
    setAddToCart
  ]);
  const wishlistarray = useSelector((state) => state.wishlist.items);
  const isfev = wishlistarray.some(
    (item) => Number(item?.id) === Number(product?.id),
  );
  useEffect(() => {
    setisfevorite(isfev);
  }, [isfev]);


  return (
    <div className={styles.actions}>
      <form className={styles.icons} action={formAction}>
        <>
          <input type="hidden" name="id" value={product.id || ""} />
          <input type="hidden" name="size" value={selectedSize || ""} />
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
          disabled={pending}
        >
          {pending && actionTypeState === "card" ? (
            "ADDING..."
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
          onClick={handleWishlistSubmit}
        >
          {pending && actionTypeState === "wishlist" ? (
            <LoaderTag width={30} higth={30} />
          ) : (
            <FontAwesomeIcon
              className={styles.icon}
              icon={isfevorite ? fasHeart : farHeart}
            />
          )}
        </button>
      </form>
    </div>
  );
}
