"use client";
import styles from "@/Components/seingleProduct/page.module.css";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import SingleProduct from "@/Components/seingleProduct/singleProduct";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import handleAction from "@/server/hero_server";
import Loader from "@/Components/loaderFecthing/loader";

const ProductListClient = ({ initialProducts }) => {
  const pageTitle = usePathname();
  const initialstate = { state: null, message: "" };
  return (
    <div className={styles.Container}>
      <div className={styles.text}>
        <span className="font-bold ">{pageTitle}</span>
        <h1 className={styles.title}>
          Adidas Running Collection{" "}
          <span style={{ fontSize: "15px", color: "var(--color-primary)" }}>
            ( {initialProducts?.length || 0} )
          </span>
        </h1>
      </div>
      <MiniDrowp />
      <div className={styles.products}>
        {initialProducts && initialProducts.length > 0 ? (
          initialProducts.map((item) => (
            <SingleProduct key={item.id} productItem={item} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListClient;
