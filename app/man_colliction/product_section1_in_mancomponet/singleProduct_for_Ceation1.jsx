"use client";
import styles from "@/Components/seingleProduct/page.module.css";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import SingleProduct from "@/Components/seingleProduct/product";
import { usePathname } from "next/navigation";

const ProductListClient = ({ initialProducts }) => {
  
  const pagename = usePathname();

  return (
    <div className={styles.Container}>
      <div className={styles.text}>
        <span className="font-bold ">
          {pagename}
        </span>
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
