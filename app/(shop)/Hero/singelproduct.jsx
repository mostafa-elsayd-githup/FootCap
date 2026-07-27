"use client";
import styles from "@/Components/singleProduct/page.module.css";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import SingleProduct from "@/Components/singleProduct/singleProduct";
import { usePathname } from "next/navigation";
import NoProducts from "../not_Foundproduct";

const ProductListClient = ({ initialProducts }) => {
  const pageTitle = usePathname();
  return (
    <div className={styles.Container}>
      <div className={styles.text}>
        <span>{pageTitle}</span>
        <h1 className={styles.title}>
          Adidas Running Collection{" "}
          <span style={{ fontSize: "15px", color: "var(--color-primary)" }}>
            ( {initialProducts?.length || 0} )
          </span>
        </h1>
      </div>
      <MiniDrowp />
      <div className={styles.products}>
        {initialProducts.length > 0 ? (
          initialProducts.map((item) => (
            <SingleProduct key={item.id} productItem={item} />
          ))
        ) : (
          <NoProducts />
        )}
      </div>
    </div>
  );
};

export default ProductListClient;
