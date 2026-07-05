"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./productStyle.module.css";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./serverFile";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function SeveButton({ product }) {
  const initialstate = { state: null, message: "" };
  const [status, formAction, pending] = useActionState(
    EditProduct,
    initialstate,
  );
  useEffect(() => {
    if (status.message) {
      if (status.success) {
        toast.success(status.message);
      } else {
        toast.error(status.message);
      }
    }
  }, [status]);
  return (
    <div className={styles.actionRow}>
      <form className={styles.gridContainer} action={formAction}>
        <button type="submit" className={styles.saveBtn}>
          {pending ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill={"currentColor"}
              viewBox={"0 0 24 24"}
            >
              <path d="M13 7h-2V2h2v5M13 22h-2v-5h2v5M22 13h-5v-2h5v2M7 13H2v-2h5v2M16.24 9.17l-.7-.71-.71-.7 1.77-1.77 1.76-1.77.71.71.71.71-1.77 1.76zM5.64 19.78l-.71-.71-.71-.71 1.77-1.76 1.77-1.77.7.71.71.7-1.77 1.77zM18.36 19.78l-1.76-1.77-1.77-1.77.71-.7.7-.71 1.77 1.77 1.77 1.76-.71.71zM7.76 9.17 5.99 7.4 4.22 5.64l.71-.71.71-.71L7.4 5.99l1.77 1.77-.71.7z" />
            </svg>
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} /> Save Product Changes
            </>
          )}
        </button>
        <input type="hidden" name="product" value={JSON.stringify(product)} />
      </form>
    </div>
  );
}
