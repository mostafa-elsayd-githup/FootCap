"use client";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faTags,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./productStyle.module.css";
import { Card } from "react-bootstrap";
import SeveButton from "./SaveProduct";
export default function EditProductPage({ product }) {
  const [products, setProducts] = useState({
    id: product.id,
    type: product?.type,
    title: product?.title,
    description: product?.description,
    price: product?.price,
    oldprice: product?.oldprice,
    stock: product?.stock,
    image: product?.image,
    image_Hover: product?.image_Hover,
    image3: product?.image3,
    image4: product?.image4,
    video: product?.video,
  });

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setProducts((prev) => ({
        ...prev,
        [imageKey]: localUrl,
      }));
    }
  };
  const lengthNmae = 100;
  const lengthDescription = 300;
  const hendlenameChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "oldprice") {
      if (Number(value) < 0) return;
    }
    if (name === "stock") {
      if (value.includes(".")) return;
      if (Number(value) < 0) return;
    }
    if (name === "name") {
      if (value.length > 100) return;
    }
    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const price = Intl.NumberFormat("en", {
    notation: "standard",
    currency: "EGP",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Edit Store Product / {product.type}</h1>
          <p>
            Product ID:{" "}
            <span className={styles.idHighlight}>#{product?.id || "8742"}</span>
          </p>
        </div>
      </div>
      <div className={styles.Columncontainer}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.mediaContainerGrid}>
              <div
                className={styles.imageUploadWrapper}
                onClick={() => fileInputRef1.current.click()}
              >
                <Card.Img
                  src={product.image}
                  alt={product.name}
                  className={styles.mainImage}
                />

                <div className={styles.imageOverlay}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />

                  <span>Upload Image</span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef1}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image")}
                />
              </div>

              <div
                className={styles.imageUploadWrapper}
                onClick={() => fileInputRef2.current.click()}
              >
                <Card.Img
                  src={product.image_Hover}
                  alt={product.name}
                  className={styles.mainImage}
                />
                <div className={styles.imageOverlay}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />

                  <span>Upload Image</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef2}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image_Hover")}
                />
              </div>
              <div
                className={styles.imageUploadWrapper}
                onClick={() => fileInputRef3.current.click()}
              >
                {product.image3 ? (
                  <Card.Img
                    src={product.image3}
                    alt={product.name}
                    className={styles.mainImage}
                  />
                ) : (
                  <video
                    autoPlay
                    src={product.video}
                    alt={product.name}
                    className={styles.mainImage}
                  />
                )}
                <div className={styles.imageOverlay}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />

                  <span>Upload Image</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef3}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image3")}
                />
              </div>
              <div
                className={styles.imageUploadWrapper}
                onClick={() => fileInputRef4.current.click()}
              >
                {product?.image4 ? (
                  <Card.Img src={product.image4} alt={product.name} />
                ) : (
                  <Card.Img src={null} alt={""} />
                )}

                <div className={styles.imageOverlay}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />

                  <span>Upload Image</span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef4}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "video")}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.summaryCard}`}>
            <h3>Live Stats Preview</h3>

            <div className={styles.statRow}>
              <span>Status:</span>

              <span
                className={
                  product.stock > 0 ? styles.statusIn : styles.statusOut
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className={styles.statRow}>
              <span>Current Value:</span>
              <strong>{price}</strong>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FontAwesomeIcon icon={faTags} className={styles.cardIcon} />
              <h3>Basic Information</h3>
            </div>
            <div className={styles.inputGroup}>
              <label>
                Product Title / Name {`( ${lengthNmae} Character )`}
              </label>

              <input
                type="text"
                name="name"
                value={products?.title || ""}
                onChange={hendlenameChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Description {`( ${lengthDescription} Character )`}</label>

              <textarea
                name="description"
                value={products?.description}
                onChange={hendlenameChange}
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className={styles.cardIcon}
              />

              <h3>Pricing & Inventory</h3>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Sale Price (EGP)</label>

                <input
                  type="text"
                  name="price"
                  value={products?.price ?? ""}
                  onChange={hendlenameChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Regular Price (EGP)</label>

                <input
                  type="text"
                  name="oldprice"
                  value={products?.oldprice ?? ""}
                  onChange={hendlenameChange}
                  placeholder="000"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Stock Quantity</label>

                <input
                  type="number"
                  name="stock"
                  value={products?.stock ?? ""}
                  onChange={hendlenameChange}
                  placeholder="000"
                />
              </div>
            </div>
          </div>

          <SeveButton product={products} />
        </div>
      </div>
    </div>
  );
}