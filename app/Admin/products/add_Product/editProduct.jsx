"use client";

import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faTags,
  faMoneyBillWave,
  faGlobe,
  faRuler,
  faPalette,
  faBoxes,
  faCalendarAlt,
  faInfoCircle,
  faTimes,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./productStyle.module.css";
import { Card } from "react-bootstrap";
import SaveButton from "./SaveProduct";

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export const PRODUCT_TYPES = [
  "Apparel Set",
  "Ball",
  "Bottle",
  "Cap",
  "Hoodie",
  "Jacket",
  "Pants",
  "Polo Shirt",
  "Racket",
  "Shoes",
  "Shorts",
  "Socks",
  "Sweater",
  "T-Shirt",
  "Towel",
];

export default function AddProductPage({ sectionType }) {
  const [products, setProducts] = useState({
    category: "",
    type: sectionType || "",
    product_type: "",
    title: "",
    description: "",
    price: "",
    oldprice: "",
    stock: "",
    Inventory: "",
    quantity: "",
    watchde: "",
    gender: "Unisex",
    made: "",
    url: [],
    sizes: [],
    colors: [],
    created_at: new Date().toISOString().split("T")[0],
    rating: "",
    image: null,
    image_Hover: null,
    image3: null,
    image4: null,
    video: "",
  });

  const [colorInput, setColorInput] = useState("");

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const videoInputRef = useRef(null);

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
    if (products[imageKey] && products[imageKey].startWith("blob:")) {
      URL.revokeObjectURL(products[imageKey]);
    }
      setProducts((prev) => ({
        ...prev,
        [imageKey]: URL.createObjectURL(file),
        [`${imageKey}_file`]: file,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      [
        "price",
        "oldprice",
        "stock",
        "Inventory",
        "quantity",
        "watchde",
      ].includes(name) &&
      Number(value) < 0
    ) {
      return;
    }
    if (name === "title" && value.length > 100) return;
    if (name === "description" && value.length > 300) return;

    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSize = (size) => {
    setProducts((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
  };

  const handleAddColor = (e) => {
    if (e.key === "Enter" && colorInput.trim()) {
      e.preventDefault();
      if (!products.colors.includes(colorInput.trim())) {
        setProducts((prev) => ({
          ...prev,
          colors: [...prev.colors, colorInput.trim()],
        }));
      }
      setColorInput("");
    }
  };

  const removeColor = (colorToRemove) => {
    setProducts((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== colorToRemove),
    }));
  };

  const formattedPrice = Intl.NumberFormat("en", {
    notation: "standard",
    currency: "EGP",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(Number(products.price) || 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Add New Product / {sectionType}</h1>
          <p>Configure product attributes, inventory, and media</p>
        </div>
      </div>

      <div className={styles.Columncontainer}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className={styles.cardIcon}
              />
              <h3>Product Media</h3>
            </div>
            <div className={styles.mediaContainerGrid}>
              {[
                {
                  key: "image",
                  label: "Main Image",
                  ref: fileInputRef1,
                  type: "image",
                },
                {
                  key: "image_Hover",
                  label: "Hover Image",
                  ref: fileInputRef2,
                  type: "image",
                },
                {
                  key: "image3",
                  label: "Image 3",
                  ref: fileInputRef3,
                  type: "image",
                },
                {
                  key: "image4",
                  label: "Image 4",
                  ref: fileInputRef4,
                  type: "image",
                },
                {
                  key: "video",
                  label: "Product Video",
                  ref: videoInputRef,
                  type: "video",
                },
              ].map((item, idx) => {
                const fileUrl = products[item.key];
                const isVideo = item.type === "video";

                return (
                  <div
                    key={idx}
                    className={styles.imageUploadWrapper}
                    onClick={() => item.ref.current.click()}
                  >
                    {fileUrl ? (
                      isVideo ? (
                        <video
                          src={fileUrl}
                          className={styles.mainImage}
                          controls
                          muted
                          loop
                        />
                      ) : (
                        <Card.Img src={fileUrl} className={styles.mainImage} />
                      )
                    ) : (
                      <div className={styles.placeholderBox}>{item.label}</div>
                    )}

                    <div className={styles.imageOverlay}>
                      <FontAwesomeIcon icon={faCloudUploadAlt} />
                      <span>Upload {isVideo ? "Video" : "Image"}</span>
                    </div>

                    <input
                      type="file"
                      ref={item.ref}
                      style={{ display: "none" }}
                      accept={isVideo ? "video/*" : "image/*"}
                      onChange={(e) => handleFileChange(e, item.key)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${styles.card} ${styles.summaryCard}`}>
            <h3>Live Overview</h3>
            <div className={styles.statRow}>
              <span>Status:</span>
              <span
                className={
                  Number(products.stock) > 0
                    ? styles.statusIn
                    : styles.statusOut
                }
              >
                {Number(products.stock) > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className={styles.statRow}>
              <span>Target Gender:</span>
              <strong>{products.gender}</strong>
            </div>
            <div className={styles.statRow}>
              <span>Selected Sizes:</span>
              <strong>
                {products.sizes.length ? products.sizes.join(", ") : "None"}
              </strong>
            </div>
            <div className={styles.statRow}>
              <span>Current Value:</span>
              <strong>{formattedPrice}</strong>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FontAwesomeIcon icon={faTags} className={styles.cardIcon} />
              <h3>Basic Details</h3>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>
                  Product Title ({100 - products.title.length} Left)
                </label>
                <input
                  type="text"
                  name="title"
                  value={products.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Premium Cotton T-Shirt"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>
                  <FontAwesomeIcon icon={faLayerGroup} /> Product Sub-Type
                </label>
                <select
                  name="product_type"
                  value={products.product_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Product Type...</option>
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>
                Description ({300 - products.description.length} Left)
              </label>
              <textarea
                name="description"
                value={products.description}
                onChange={handleInputChange}
                placeholder="Product characteristics and specifications..."
                rows="3"
              ></textarea>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>
                  <FontAwesomeIcon icon={faGlobe} /> External Product URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={products.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/details"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>
                <FontAwesomeIcon icon={faInfoCircle} /> Made In (Origin)
              </label>
              <input
                type="text"
                name="made"
                value={products.made}
                onChange={handleInputChange}
                placeholder="e.g. Made in Egypt"
              />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FontAwesomeIcon icon={faRuler} className={styles.cardIcon} />
              <h3>Variants & Options</h3>
            </div>

            <div className={styles.inputGroup}>
              <label>Available Sizes</label>
              <div className={styles.sizeSelector}>
                {AVAILABLE_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.sizeChip} ${products.sizes.includes(size) ? styles.activeChip : ""}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>
                  <FontAwesomeIcon icon={faPalette} /> Available Colors (Press
                  Enter)
                </label>
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyDown={handleAddColor}
                  placeholder="Type color & hit enter..."
                />
                <div className={styles.tagContainer}>
                  {products.colors.map((color, i) => (
                    <span key={i} className={styles.tag}>
                      {color}
                      <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => removeColor(color)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Gender Category</label>
                <select
                  name="gender"
                  value={products.gender}
                  onChange={handleInputChange}
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className={styles.cardIcon}
              />
              <h3>Pricing & Inventory Control</h3>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Sale Price (EGP)</label>
                <input
                  type="number"
                  name="price"
                  value={products.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Regular Price (EGP)</label>
                <input
                  type="number"
                  name="oldprice"
                  value={products.oldprice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>
                  <FontAwesomeIcon icon={faBoxes} /> Stock Qty
                </label>
                <input
                  type="number"
                  name="stock"
                  value={products.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={products.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Inventory SKU / ID</label>
                <input
                  type="number"
                  name="Inventory"
                  value={products.Inventory}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className={styles.inputGroup}>
                <label> Category</label>
                <input
                  type="text"
                  name="category"
                  value={products.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  <FontAwesomeIcon icon={faCalendarAlt} /> Created At
                </label>
                <input
                  type="date"
                  name="created_at"
                  value={products.created_at}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <SaveButton product={products} />
        </div>
      </div>
    </div>
  );
}
