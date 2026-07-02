"use client";
import styles from "./table.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import { Card } from "react-bootstrap";
function ProductTable({ products }) {

  return (
    <div className={styles.adminLayout}>
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div>
            <h1
              className="text-3xl font-black italic uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              Inventory Management / {products[0].type} ({products.length})
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor and update your store products
            </p>
          </div>
          <button className={styles.addBtn}>
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Product
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
              {products.map((product) => {
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
                      <div className={styles.actionButtons}>
                        <Link
                          className={styles.editBtn}
                          href={`/Admin/products/${product.id}`}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>

                        <DeleteButton id={product.id} />
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
export default ProductTable;
