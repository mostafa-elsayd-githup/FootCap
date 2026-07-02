"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import styles from "./table.module.css";
import { useActionState, useEffect, useState } from "react";
import ProductSHandle from "@/server/adminProducts_server";
export default function DeleteButton({ id }) {
  const initialstate = { state: null, message: "" };
  const [state, formAcrion, pending] = useActionState(
    ProductSHandle,
    initialstate,
  );
  const [buttontype, setbuttontype] = useState("");
  const [productId, setproductId] = useState("");
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);
  return (
    <form action={formAcrion}>
      <input type="hidden" name="productType" value={buttontype} />
      <input type="hidden" name="productId" value={id} />
      <button
        type="submit"
        disabled={pending}
        className={styles.deleteBtn}
        onClick={() => {
          (setbuttontype("Delete"), setproductId(productId));
        }}
      >
        {pending ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={19}
            fill={"currentColor"}
            viewBox={"0 0 24 24"}
          >
            <path d="M13 7h-2V2h2v5M13 22h-2v-5h2v5M22 13h-5v-2h5v2M7 13H2v-2h5v2M16.24 9.17l-.7-.71-.71-.7 1.77-1.77 1.76-1.77.71.71.71.71-1.77 1.76zM5.64 19.78l-.71-.71-.71-.71 1.77-1.76 1.77-1.77.7.71.71.7-1.77 1.77zM18.36 19.78l-1.76-1.77-1.77-1.77.71-.7.7-.71 1.77 1.77 1.77 1.76-.71.71zM7.76 9.17 5.99 7.4 4.22 5.64l.71-.71.71-.71L7.4 5.99l1.77 1.77-.71.7z" />
          </svg>
        ) : (
          <FontAwesomeIcon icon={faTrash} />
        )}
      </button>
    </form>
  );
}
