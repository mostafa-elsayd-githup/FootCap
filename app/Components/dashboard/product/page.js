"use server";
import Link from "next/link";
import styles from "../admin.module.css";
import AdminProducts from "./products";
import NavAction from "../../../Navbar/NavAction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function Product() {
  return (
    <>
      <NavAction />

      <div className={styles.products}>
        <AdminProducts />
      </div>
    </>
  );
}

export default Product;
