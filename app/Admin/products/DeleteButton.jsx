"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import styles from "./table.module.css";
import { useActionState, useEffect, useState } from "react";
import ProductSHandle from "@/server/adminProducts_server";
import LoaderTag from "@/Components/loaderFecthing/loaderTofetch";
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
        {true ? <LoaderTag width={19} higth={19}  /> : <FontAwesomeIcon icon={faTrash} />}
      </button>
    </form>
  );
}
