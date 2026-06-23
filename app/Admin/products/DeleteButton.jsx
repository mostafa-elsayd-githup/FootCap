"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./table.module.css";
import { useActionState, useState } from "react";
import ProductSHandle from "@/server/adminProducts_server";
export default function DeleteButton({ id }) {
  const initialstate = { state: null, message: "" };
  const [state, formAcrion, pending] = useActionState(
    ProductSHandle,
    initialstate,
  );
  const [buttontype, setbuttontype] = useState("");
  const [productId, setproductId] = useState("");
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
        {pending ? "..." : <FontAwesomeIcon icon={faTrash} />}
      </button>
    </form>
  );
}
