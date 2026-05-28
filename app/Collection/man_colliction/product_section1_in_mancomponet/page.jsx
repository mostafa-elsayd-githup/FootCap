"use server";
import Link from "next/link";
import SingleProduct from "./singleProduct_for_Ceation1";
import styles from "./products.module.css";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import NavAction from "@/Components/Navbar/NavAction";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
async function getWishlist() {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
      cache: "no-store",
      next: { tags: ["navbar"] },
    });
    const userWishlist = await res.json();
    return userWishlist;
  } catch (error) {
    return error;
  }
}
async function getData(categoryKey) {
  try {
    const res = await fetch(
      `http://localhost:1200/products?type=${categoryKey}`,
      { next: { tags: ["mans section"] }, cache: "no-store" },
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}

async function Product({ searchParams }) {
  const qurey = await searchParams;
  const categoryKey = qurey.type;
  const data = await getData(categoryKey);
  const wishlistdata = await getWishlist();

  return (
    <>
      <NavAction />
      <div className={styles.Container}>
        <div className={styles.text}>
          <span className={styles.spans}>
            <Link
              className={styles.span}
              href="/Components/sport-Componente/sportProcuts/sport_from_gemProducts"
            >
              Sport /
            </Link>
            <span>
              {"   "}
              <Link className={styles.span} href="">
                Gym & Training
              </Link>
            </span>
          </span>
          <h1 className={styles.title}>
            Men&apos;s Jerseys{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              ( {data.length} )
            </span>
          </h1>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item, index) => {
              const isfavorite = wishlistdata.wishlist?.some(
                (wishlist) => wishlist.id === item.id,
              );
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
                  isfevorite={isfavorite}
                />
              );
            })}
        </div>
      </div>
      <DiscoundComponent />
      <Footer />
    </>
  );
}
export default Product;
