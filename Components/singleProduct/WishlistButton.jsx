"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { useActionState, useEffect, useState } from "react";
import { toggleWishlistOptimistic } from "@/RTK/wishlistslice";
import { useDispatch, useSelector } from "react-redux";
import handleAction from "@/server/hero_server";
import {
  faHeart as farHeart,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import LoaderTag from "@/Components/loaderFecthing/loaderTofetch";
import { useOpneing } from "@/RTK/storcontext";
import { toast } from "sonner";

export default function WishlistButton({ favoriteProduct }) {
  const initialState = { message: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handleAction,
    initialState,
  );
  const dispatch = useDispatch();
  const { setisfevorite } = useOpneing();
  const [actionTypeState, setActionTypeState] = useState("");
  const handleWishlistSubmit = async () => {
    setActionTypeState("wishlist");
    dispatch(toggleWishlistOptimistic(favoriteProduct));
  };
  const wishlistarray = useSelector((state) => state.wishlist.items);

  const isfevorite = wishlistarray.some(
    (item) => Number(item.id) === favoriteProduct.id,
  );
  useEffect(() => {
    if (state?.state === 401) {
      toast.error("Login Required", {
        description: "Please log in to continue. Redirecting...",
        position: "bottom-right",
        duration: 3000,
        onAutoClose: () => {
          Router.replace("/register");
        },
      });
    }
    if (state?.wishliststate !== undefined && state?.wishliststate !== null) {
      setisfevorite(state.wishliststate);

      if (state.wishliststate) {
        toast.success("Added to Wishlist", {
          position: "bottom-right",
          duration: 2000,
        });
      } else {
        toast.info("Removed from Wishlist", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    }
  }, [state.wishliststate, state?.state, setisfevorite]);

  return (
    <form action={formAction}>
      <button type="submit" disabled={pending} onClick={handleWishlistSubmit}>
        {pending ? (
          <LoaderTag width={32} higth={40} />
        ) : (
          <FontAwesomeIcon
            className={styles.icon}
            icon={isfevorite ? fasHeart : farHeart}
          />
        )}
      </button>
      <input type="hidden" name="actiontype" value={actionTypeState || ""} />
      <input type="hidden" name="id" value={favoriteProduct?.id || ""} />
    </form>
  );
}
