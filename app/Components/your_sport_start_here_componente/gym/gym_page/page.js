import Link from "next/link";
import styles from "./page.module.css";
import SingleProduct from "./singelproduct";
import { Container } from "react-bootstrap";
import NotFoundComponent from "../NotFoundComponent";
import NavAction from "../../../../Navbar/NavAction";
import MiniDrowp from "./minidrowp/minidrowp";
import Footer from "../../../../footer/Footre";

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

async function gitdata() {
  try {
    const res = await fetch(`http://localhost:1200/your_sport_start_hear_gym`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return undefined;
    } else if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    throw new Error("");
  }
}

async function Product() {
  const data = await gitdata();
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
            Gym & Training Collection{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              [ {data.length} ]
            </span>
          </h1>
          <p className={styles.prag}>
            Welcome to all the gym gear you&apos;ll ever need. Discover premium
            training kit for men, women and children in the best-selling adidas
            range. Our fitness designs are made for performance and comfort with
            pieces ranging from high-end designer collaborations to activewear
            staples. Browse to discover head-to-toe gym gear for every workout
            from cardio to resistance, HIIT to strength and everything in
            between. Our gym and training range is infused with multiple
            technologies to keep you training outdoors in all weathers and
            challenging yourself at the gym. Choose designs that are breathable,
            sweat-wicking, lightweight to keep you comfortable, in cuts that
            deliver distraction-free comfort via clothing with great support,
            coverage and freedom of movement. With looks this good, nothing need
            keep you from your next session. <button></button>
          </p>
        </div>
        <MiniDrowp/>
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              const isfvevorite = wishlist.some(
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
      <Footer/>
    </>
  );
}

export default Product;
