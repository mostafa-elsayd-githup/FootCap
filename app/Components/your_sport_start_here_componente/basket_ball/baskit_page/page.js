"use server";
import Link from "next/link";
import styles from "./page.module.css";
import SingleProduct from "./singelproduct";
import NotFoundComponent from "../NotFoundComponent";
import NavAction from "../../../../Navbar/NavAction";
import MiniDrowp from "./minidrowp/minidrowp";
import Footer from "../../../../footer/Footre";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
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
  } catch {
    return [];
  }
}
async function gitdata(categoryKey) {
  try {
    const res = await fetch(
      `http://localhost:1200/products?type=${categoryKey}`,
      { next: { tags: ["backitball"] }, cache: "no-store" },
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    throw new Error("");
  }
}

async function Product({searchParams}) {
    const queryParams = await searchParams;
  const categoryKey = queryParams.type;
  const data = await gitdata(categoryKey);
  const wishlist = await getWishlist();

  if (!data || data.length === 0) {
    return (
      <>
        <NavAction />
        <NotFoundComponent />
      </>
    );
  }
  return (
    <>
      <NavAction />
      <div className={styles.Container}>
        <div className={styles.text}>
          <span className={styles.spans}>
            <Link
              className={styles.span}
              href="/Components/sport-Componente/sportProcuts/sport_from_gemProducts?club=tshirt"
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
            Adidaes BasketBall Collection{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              [ {data.length} ]
            </span>
          </h1>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              const isfvevorite = wishlist?.wishlist.some(
                (wishlist) => wishlist.id === item.id,
              );
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
                  isfevorite={isfvevorite}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
