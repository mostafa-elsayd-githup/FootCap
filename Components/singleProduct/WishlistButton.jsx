"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { useTransition } from "react";
import { toggleWishlistOptimistic } from "@/RTK/wishlistslice";
import { useDispatch, useSelector } from "react-redux";
import handleAction from "@/server/hero_server";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import LoaderTag from "@/Components/loaderFecthing/loaderTofetch";
import { toast } from "sonner";

export default function WishlistButton({ favoriteProduct }) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const wishlistarray = useSelector((state) => state.wishlist.items) || [];
  const isfev = wishlistarray.some(
    (item) => Number(item?.id) === Number(favoriteProduct?.id)
  );

  const handleWishlistSubmit = () => {
    dispatch(toggleWishlistOptimistic(favoriteProduct));
    startTransition(async () => {
      const formData = new FormData();
      formData.append("actiontype", "wishlist");
      formData.append("id", favoriteProduct?.id || "");
      const res = await handleAction(null, formData);

      if (res?.state === 201 && res?.guestProduct) {
        let localWishlist =
          JSON.parse(localStorage.getItem("guest_wishlist")) || []; 
        const exists = localWishlist.some(
          (item) => item.id === Number(res.guestProduct.id)
        );

        if (exists) {
          localWishlist = localWishlist.filter(
            (item) => item.id !== res.guestProduct.id
          );
          toast.success("Removed from Wishlist", {
            position: "bottom-right",
            duration: 2000,
          });
        } else {
          localWishlist = [...localWishlist, res.guestProduct];
          toast.success("Added to Wishlist", {
            position: "bottom-right",
            duration: 2000,
          });
        }
        localStorage.setItem("guest_wishlist", JSON.stringify(localWishlist));
        window.dispatchEvent(new Event("guest_wishlist_updated"));
      } else if (
        res?.wishliststate !== undefined &&
        res?.wishliststate !== null
      ) {
        if (res.wishliststate) {
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
    });
  };

  return (
    <button type="button" disabled={isPending} onClick={handleWishlistSubmit}>
      {isPending ? (
        <LoaderTag width={32} higth={40} />
      ) : (
        <FontAwesomeIcon
          className={styles.icon}
          icon={isfev ? fasHeart : farHeart}
        />
      )}
    </button>
  );
}