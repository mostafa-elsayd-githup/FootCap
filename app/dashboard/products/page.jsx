"use server";
import AdminProducts from "./products";
import NavAction from "../../../Navbar/NavAction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
async function gitdata(section) {
  try {
    if (section) {
      const res = await fetch(
        `http://localhost:1200/products?type=${section}`,
        { next: { Tags: ["Running"] }, cache: "no-store" },
      );
      if (res.ok) {
        const data = await res.json();
        return { data, title: section };
      }
    }
  } catch {
    throw new Error("");
  }
}
async function Product({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const section = resolvedSearchParams.section;
  const data = await gitdata(section);

  return (
    <>
      <NavAction />

      <AdminProducts products={data} />
    </>
  );
}

export default Product;
