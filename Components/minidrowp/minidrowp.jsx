"use client";
import styles from "./minidrowp.module.css";
import { Card } from "react-bootstrap";
import { useOpneing } from "@/RTK/storcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";
import Link from "next/link";
import Buttons from "./minidropButton";
export default function MiniDrowp() {
  const { isOpen, setIsOpen, selectedProduct, setAddToCart, setselectedSize, selectedSize } = useOpneing();
  const handleViewProductButton = async () => {
    redirect(`/product/${selectedProduct.id}`);
  };
  const oldprice = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(selectedProduct?.oldPrice));
  const price = Intl.NumberFormat("en", {
    notation: "standard",
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(parseInt(selectedProduct?.price));
  return (
    <>
      {selectedProduct && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.activeOverlay : ""}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            key={selectedProduct.id}
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.imageGallery}>
              <div className={styles.imageContainer}>
                <Card.Img
                  src={selectedProduct.image}
                  className={styles.mainImage}
                  alt={selectedProduct.name}
                />
              </div>

              <div className={styles.imageContainer}>
                {selectedProduct.image_Hover ? (
                  <Card.Img
                    src={selectedProduct.image_Hover}
                    className={styles.mainImage}
                    alt={selectedProduct.name}
                  />
                ) : null}
              </div>

              <div className={styles.imageContainer}>
                {selectedProduct.image3 ? (
                  <Card.Img
                    src={selectedProduct.image3}
                    className={styles.mainImage}
                    alt={selectedProduct.name}
                  />
                ) : selectedProduct.video ? (
                  <video
                    src={selectedProduct.video}
                    className={styles.mainImage}
                    autoPlay
                    muted
                    loop
                  />
                ) : null}
              </div>

              <div className={styles.imageContainer}>
                {selectedProduct.image4 && (
                  <Card.Img
                    src={selectedProduct.image4}
                    className={styles.mainImage}
                    alt={selectedProduct.name}
                  />
                )}
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.headerInfo}>
                <h1 className={styles.productName}>{selectedProduct.name}</h1>
                {selectedProduct.oldPrice ? (
                  <span>
                    <span className={styles.price_red}>{price}</span>
                    <span className={styles.oldPrice}>{oldprice}</span>
                  </span>
                ) : (
                  <p className={styles.price}>{price}</p>
                )}
                <div className={styles.colors_available}>
                  {selectedProduct.url?.length} colours available
                </div>
              </div>
              <div className={styles.sizeSection}>
                <h3 className={styles.sectionTitle}>Select Size</h3>
                <div className={styles.sizeGrid}>
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeBox} 
                    ${selectedSize === size ? styles.activeSize : ""}`}
                      onClick={() => {
                        if (selectedSize === size) {
                          setselectedSize(null);
                          setAddToCart(false);
                        } else {
                          setselectedSize(size);
                          setAddToCart(true);
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <Link
                  className={styles.View_ProductBtn}
                  href={``}
                  onClick={handleViewProductButton}
                >
                  View Product
                  <span className={styles.arrowIcon}>
                    <FontAwesomeIcon icon={faRightLong} />
                  </span>
                </Link>

                <Buttons />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
