"use client";
import Wishlist_Action from "@/server/wishliest_server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActionState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./Products.module.css";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import Loader from "@/Components/loaderFecthing/loaderTofetch";

export default function Button({ product }) {
  const dispatch = useDispatch();

  const intialstate = { state: null, message: "", timeStamp: null };
  const [state, formAction, pending] = useActionState(
    Wishlist_Action,
    intialstate,
  );

  const lastProcessedTime = useRef(null);

  useEffect(() => {
    if (!state || !state.timeStamp) return;

    if (state.timeStamp === lastProcessedTime.current) return;

    lastProcessedTime.current = state.timeStamp;

    if (state.state === 200) {
      toast.success(state.message || "Updated Wishlist", {
        position: "bottom-right",
        duration: 2000,
      });
    } else if (state.state === 401) {
      toast.error(state.message || "Please login to continue", {
        position: "bottom-right",
        duration: 2000,
      });
    } else if (state.state >= 400) {
      toast.error(state.message || "Something went wrong", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={product.id || ""} />
      <input type="hidden" name="actiontype" value="wishlist" />
      <button
        type="submit"
        disabled={pending}
        className={`${styles.icon_btn} ${styles.heart_btn}`}
      >
        {pending ? (
          <Loader wigth={30} higth={30} />
        ) : (
          <FontAwesomeIcon icon={fasHeart} />
        )}
      </button>
    </form>
  );
}
