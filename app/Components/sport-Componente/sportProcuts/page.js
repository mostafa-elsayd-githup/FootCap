"use server";
import NotFoundComponent from "../../Hero/NotFoundComponent";
import Link from "next/link";
import styles from "./sportproducts.module.css";
import SingleProduct from "./SingleProduct";
import NavAction from "../../../Navbar/NavAction";
import MiniDrowp from "./minidrowp/minidrowp";
import Footer from "../../../footer/Footre";
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

// async function getwishlist() {
//   try {
//     const res = await fetch("http://localhost:1200/wishlist", {
//       cache: "no-store",
//     });
//     if (!res.ok) return [];
//     return await res.json();
//   } catch {
//     return [];
//   }
// }

async function getdata(category) {
  try {
    const res = await fetch(`http://localhost:1200/products?type=${category}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("");
  }
}

async function Product({ searchParams }) {
  const queryParams = await searchParams;
  const categoryKey = queryParams.type;

  // استدعاء البيانات مباشرة
  const data = await getdata(categoryKey);
  const wishlistdata = await getWishlist();

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
              {" "}
              <Link className={styles.span} href="">
                Gym & Training
              </Link>
            </span>
          </span>
          <h1 className={styles.title}>
            Gym and Training{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              [ {data.length} ]
            </span>
          </h1>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              const isfevorite = !!wishlistdata.wishlist.some(
                (wish) => wish.id === item.id,
              );
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
      <Footer />
    </>
  );
}

export default Product;
