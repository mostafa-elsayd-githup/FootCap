"use client";
import React from "react";
import { useState } from "react";
import styles from "./products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBoxOpen,
  faUsers,
  faPlus,
  faEdit,
  faTrash,
  faBan,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Card } from "react-bootstrap";

const productsList = [
  {
    id: 1,
    name: "Germany Home Jersey 24/25",
    category: "Jerseys",
    price: 1200,
    stock: 15,
    img: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Adidas Predator Elite",
    category: "Shoes",
    price: 4500,
    stock: 3,
    img: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Training Pants Black",
    category: "Apparel",
    price: 850,
    stock: 0,
    img: "https://via.placeholder.com/50",
  },
];
export default function AdminProducts({ products }) {
  
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };
  return (
    <div className={styles.adminLayout}>

      <div className={styles.content}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div>
            <h1
              className="text-3xl font-black italic uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              Inventory Management / {products.title} ({products.data.length}) 
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor and update your store products
            </p>
          </div>
          <button className={styles.addBtn}>
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Product
          </button>
        </div>

        {/* Table Area */}
        <div className={styles.tableContainer}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((product) => {
                const number= product.price
               const price = parseFloat(number)
                const totalmoney = new Intl.NumberFormat("en", {
                  notation: "standard",
                  style: "currency",
                  currency: "EGP",                 
                  minimumFractionDigits: 3,
                }).format(price);
                return (
                  <tr key={product.id} className={styles.tableRow}>
                    <td className="d-flex align-items-center gap-3">
                      <Card.Img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImg}
                      />
                      <span className="fw-bold">{product.name}</span>
                    </td>
                    <td>{product.category}</td>
                    <td className="fw-bold"> {totalmoney}</td>
                    <td>
                      <span
                        className={`${styles.stockBadge} ${
                          product.stock > 10
                            ? styles.inStock
                            : product.stock > 0
                              ? styles.lowStock
                              : styles.outStock
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.editBtn} title="Edit">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className={styles.deleteBtn} title="Delete">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
