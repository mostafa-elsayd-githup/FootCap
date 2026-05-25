"use client";
import React, { useActionState } from "react";
import { useState } from "react";
import styles from "./products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import ProductSHandle from "./server";
import Link  from "next/link";
export default function AdminProducts({ products }) {  
  const initialstate = { state: null, message: "" };
  const [state, formAcrion, pending] = useActionState(
    ProductSHandle,
    initialstate,
  );
  const [buttontype, setbuttontype] = useState("");
  const [productId, setproductId] = useState("");
  return (
    <div className={styles.adminLayout}>
      {/* loader */}
      {pending && (
        <div className={styles.overlay}>
          form
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}
      <div className={styles.content}>
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
                const number = product.price;
                const price = parseFloat(number);
                const totalmoney = new Intl.NumberFormat("en", {
                  notation: "standard",
                  style: "currency",
                  currency: "EGP",
                  minimumFractionDigits: 0,
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
                      <form
                        action={formAcrion}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="hidden"
                          name="productType"
                          value={products.title}
                        />
                        <input
                          type="hidden"
                          name="productId"
                          value={productId}
                        />
                        <div className={styles.actionButtons}>
                          <Link
                            className={styles.editBtn}
                            href={`/Components/dashboard/products/${product.id}`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            className={styles.deleteBtn}
                            name="button"
                            value={buttontype}
                            title="Delete"
                            onClick={() => {
                              (setbuttontype("Delete"),
                                setproductId(product.id));
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </form>
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
