"use client"
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { useOpneing } from "@/RTK/storcontext";
export default function ShoppingButton({ product }) {
  const { setIsOpen, setSelectedProduct } = useOpneing();

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen(true);
        setSelectedProduct(product);
      }}
    >
      <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
    </button>
  );
}
