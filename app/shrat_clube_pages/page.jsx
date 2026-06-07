"use server";
import Link from "next/link";
import SingleProduct from "./SingleProduct_Liverpool";
import styles from "./page.module.css";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import NavAction from "@//Components/Navbar/NavAction";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import { createClientForServer } from "@/utils/supabase";

async function getdata(categoryKey) {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", categoryKey);
    return data;
  } catch (error) {
    throw error;
  }
}

async function Product({ searchParams }) {
  const query = await searchParams;
  const categoryKey = query.club;
  const data = await getdata(categoryKey);
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

          <h1 className={styles.title}>
            {currentClub.title}
            <span
              style={{
                fontSize: "15px",
                color: "var(--color-secondary)",
                marginLeft: "10px",
              }}
            >
              ( {data.length} )
            </span>
          </h1>
          <p>{currentClub.description}</p>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data && data.length > 0 ? (
            data.map((item) => {;
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
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
