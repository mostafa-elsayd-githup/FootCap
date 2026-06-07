"use server";
import Link from "next/link";
import SingleProduct from "./single_prodecte_for_section2";
import NavAction from "@/Components/Navbar/NavAction";
import styles from "./prodecte.module.css";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import { createClientForServer } from "@/utils/supabase";

async function gitData(categoryKey) {
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
  const qurey = await searchParams;
  const categoryKey = qurey.club;
  const data = await gitData(categoryKey);
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
              ( {data.length} )
            </span>
          </h1>
          <p>
            Up your sneaker game. Explore men&apos;s adidas Originals shoes for
            everything from retro re-releases to covet-worthy collabs and
            forever classics.{" "}
          </p>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
            
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
