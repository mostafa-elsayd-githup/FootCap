import { Container } from "react-bootstrap";
import Link from "next/link";
import SingleProduct from "./SingleProduct_Liverpool";
import styles from "./page.module.css";
import Footer from "../../../../footer/Footre";
import DiscoundComponent from "../discound_componente/discounds";
import NotFoundComponent from "../../../Hero/NotFoundComponent";
import NavAction from "../../../../Navbar/NavAction";
import MiniDrowp from "../product_section1_in_mancomponet/minidrowp/minidrowp";
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
async function getdata(categoryKey) {
  try {
    const res = await fetch(
      `http://localhost:1200/products?type=${categoryKey}`,
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

async function Product({ searchParams }) {
  const query = await searchParams;
  const categoryKey = query.club;
  const data = await getdata(categoryKey);
  const wishlist = await getWishlist();
  if (!data || data.length === 0) {
    return (
      <>
        <NavAction />
        <NotFoundComponent />
      </>
    );
  }
  const clubContent = [
    {
      type: "alahly",
      title: "Al Ahly FC Gear",
      description: "Show your Al Ahly pride with official kits and gear.",
    },
    {
      type: "Liverpool",
      title: "Liverpool FC Gear",
      description:
        "Show your Liverpool pride with official kits and gear, from match-day jerseys to training essentials.",
    },
    {
      type: "Real Madrid",
      title: "Real Madrid CF Gear",
      description:
        "Nothing makes your allegiance more evident than Real Madrid jerseys...",
    },
    {
      type: "Man United",
      title: "adidas Manchester United Merchandise",
      description: "Elevate your dedication to your favorite team...",
    },
    {
      type: "Bayern Munich",
      title: "FC Bayern Munich Collection",
      description: "Official gear for FC Bayern Munich.",
    },
    {
      type: "ArsenalClub",
      title: "Arsenal Football Gear",
      description: "Represent North London's finest wherever you go...",
    },
  ];

  //  المحتوى المطابق للنادى
  const currentClub = clubContent.find((club) => club.type === categoryKey) || {
    title: "All Products",
    description: "Browse our collection",
  };

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
              {" "}
              <Link className={styles.span} href="/">
                Gym & Training
              </Link>
            </span>
          </span>

          {/* 2. عرض العنوان والوصف ديناميكياً */}
          <h1 className={styles.title}>
            {currentClub.title}
            <span
              style={{ fontSize: "15px", color: "#7777", marginLeft: "10px" }}
            >
              [{data.length}]
            </span>
          </h1>
          <p>{currentClub.description}</p>
        </div>
        <MiniDrowp/>
        <div className={styles.products}>
          {data && data.length > 0 ? (
            data.map((item) => {
              const isfvevorite = !!wishlist.wishlist.some(
                (wishlist) => wishlist.id === item.id,
              );
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
                  isfevorite={isfvevorite}
                />
              );
            })
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
      <DiscoundComponent />
      <Footer />
    </>
  );
}

export default Product;
