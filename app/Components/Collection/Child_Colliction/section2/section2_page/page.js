import Link from "next/link";
import styles from "./page.module.css";
import SingleProduct from "./singelproduct";
import { Container } from "react-bootstrap";
import NotFoundComponent from "../NotFoundComponent";
import NavAction from "../../../../../Navbar/NavAction";

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

async function gitdata(categoryKey) {
  try {
    const res = await fetch(
      `http://localhost:1200/your_sport_start_hear`,
      { next: { revalidate: 60 } },
    );
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

async function Product({searchParams}) {
  const query = await searchParams;
  const categoryKey = query.club;
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
      <Container className={styles.Container}>
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
            Adidaes Running Collection{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              [ {data.length} ]
            </span>
          </h1>
        </div>
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
      </Container>
    </>
  );
}

export default Product;
