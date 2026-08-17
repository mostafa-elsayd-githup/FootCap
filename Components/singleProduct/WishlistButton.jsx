"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { useActionState, useEffect, useState } from "react";
import { toggleWishlistOptimistic } from "@/RTK/wishlistslice";
import { useDispatch, useSelector } from "react-redux";
import handleAction from "@/server/hero_server";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import LoaderTag from "@/Components/loaderFecthing/loaderTofetch";
import { toast } from "sonner";

export default function WishlistButton({ favoriteProduct }) {
  const [isfevorite, setisfevorite] = useState(false);
  const initialState = { message: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handleAction,
    initialState,
  );
  const dispatch = useDispatch();
  const handleWishlistSubmit = () => {
    dispatch(toggleWishlistOptimistic(favoriteProduct));
  };

  const wishlistarray = useSelector((state) => state.wishlist.items) || [];
  const isfev = wishlistarray.some(
    (item) => Number(item?.id) === Number(favoriteProduct?.id),
  );

  useEffect(() => {
    if (!state) return;
    if (state?.state === 201) {
      const productData = state.guestProduct;
      if (productData) {
        let localWishlist =
          JSON.parse(localStorage.getItem("guest_wishlist")) || [];
        const exists = localWishlist.some((item) => item.id === productData.id);

        if (exists) {
          localWishlist = localWishlist.filter(
            (item) => item.id !== productData.id,
          );
          toast.success("Removed from Wishlist", {
            position: "bottom-right",
            duration: 2000,
          });
        } else {
          localWishlist = [...localWishlist, productData];
          toast.success("Added to Wishlist", {
            position: "bottom-right",
            duration: 2000,
          });
        }
        localStorage.setItem("guest_wishlist", JSON.stringify(localWishlist));
        window.dispatchEvent(new Event("guest_wishlist_updated"));
      }
    }

    if (state?.wishliststate !== undefined && state?.wishliststate !== null) {
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
  }, [state, state.wishliststate]);

  useEffect(() => {
    setisfevorite(isfev);
  }, [isfev]);

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
      <input type="hidden" name="actiontype" value="wishlist" />
      <input type="hidden" name="id" value={favoriteProduct?.id || ""} />
    </form>
  );
}
