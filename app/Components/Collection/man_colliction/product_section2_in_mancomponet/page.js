"use server";
import Link from "next/link";
import SingleProduct from "./single_prodecte_for_section2";
import NavAction from "../../../../Navbar/NavAction";
import styles from "./prodecte.module.css";
import Footer from "../../../../footer/Footre";
import DiscoundComponent from "../discound_componente/discounds";
import NotFoundComponent from "../../../Hero/NotFoundComponent";
import MiniDrowp from "./minidrowp/minidrowp";
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
async function gitData(categoryKey) {
  try {
    const res = await fetch(
      `http://localhost:1200/products?type=${categoryKey}`,
    );
    if (!res.ok) return undefined;
    const data = await res.json();
 return data
  } catch {
    throw new Error("");
  }
}

async function Product({ searchParams }) {
  const qurey = await searchParams;
  const categoryKey = qurey.club;
  const data = await gitData(categoryKey);
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
            Sneakers for Men
            <span style={{ fontSize: "15px", color: "#7777" }}>
              {" "}
              [{data.length}]
            </span>
          </h1>
          <p>
            Up your sneaker game. Explore men&apos;s adidas Originals shoes for
            everything from retro re-releases to covet-worthy collabs and
            forever classics.{" "}
          </p>
        </div>
        <MiniDrowp/>
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              const isfevorite = !!wishlist.wishlist.some((e) => e.id === item.id);
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
                  isfevorite={isfevorite}
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
