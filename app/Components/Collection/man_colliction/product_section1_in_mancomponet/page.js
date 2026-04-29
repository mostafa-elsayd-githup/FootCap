"use server";
import Link from "next/link";
import SingleProduct from "./singleProduct_for_Ceation1";
import styles from "./products.module.css";
import Footer from "../../../../footer/Footre";
import DiscoundComponent from "../discound_componente/discounds";
import NotFoundComponent from "../../../Hero/NotFoundComponent";
import NavAction from "../../../../Navbar/NavAction";
import MiniDrowp from "./minidrowp/minidrowp";
async function getWishlist() {
  try {
    const res = await fetch(`http://localhost:1200/wishlist`, {
      cache: "no-store",
      next: { tags: ["wishlist"] },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
async function getData(categoryKey) {
  try {
    const res = await fetch(
      `http://localhost:1200/products?type=${categoryKey}`,
      { next: { revalidate: 60 } },
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    throw new Error("");
  }
}

async function Product({ searchParams }) {
  const qurey = await searchParams;
  const categoryKey = qurey.type;
  const data = await getData(categoryKey);
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
              [{data.length}]
            </span>
          </h1>
        </div>
        <MiniDrowp/>
        <div className={styles.products}>
          {data &&
            data.map((item, index) => {
              const isfavorite = !!wishlistdata.some(
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
