"use server";
import Link from "next/link";
import styles from "./page.module.css";
import SingleProduct from "@/app/Hero/hero_page/singelproduct";
import NavAction from "@/Components/Navbar/NavAction";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createClientForServer } from "@/utils/supabase";

async function getWishlist() {
  try {
    const supabaseServer = await createClientForServer();
    const {
      data: { user },
      error: authError,
    } = await supabaseServer.auth.getUser();
    if (authError || !user) {
      return { wishlist: [] };
    }
    const { data: profileUser, profileError } = await supabaseServer
      .from("profiles")
      .select("wishlist")
      .eq("id", user.id)
      .single();
    if (profileError) {
      console.error(
        "Error fetching wishlist from Supabase:",
        profileError.message,
      );
      return { wishlist: [] };
    }
    return profileUser;
    // const tokenstor = await cookies();
    // const token = tokenstor.get("token")?.value;
    // if (!token) {
    // return { state: 401, message: "Please login to continue" };
    // }
    // const decryption = jwt.verify(token, process.env.JWT_SECRET);
    // const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
    //   cache: "no-store",
    //   next: { tags: ["navbar"] },
    // });
    // const userWishlist = await res.json();
    // return userWishlist;
  } catch (error) {
    return error;
  }
}

async function getProductsByType(categoryKey) {
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
  const queryParams = await searchParams;
  const categoryKey = queryParams.type;
  const data = await getProductsByType(categoryKey);

  const wishlist = await getWishlist();

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
            Adidaes Running Collection{" "}
            <span style={{ fontSize: "15px", color: "var(--color-primary)" }}>
              ( {data.length} )
            </span>
          </h1>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}
                  serverWishlist={wishlist?.wishlist || []}
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
