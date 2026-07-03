"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./navbar.module.css";
import ThemeToggle from "@/Components/button/button";
import { useSelector, useDispatch } from "react-redux";
import { setInitialCart } from "@/RTK/cardslice";
import { setInitialWishlist } from "@/RTK/wishlistslice";
import MostoreLogo from "../my_logo/logo";

function NavBar({ userdata }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const pathname = usePathname();
  const wishlist = useSelector((state) => state.wishlist.items);
  const card = useSelector((state) => state.card.items);

  useEffect(() => {
    const initialize = () => {
      setIsMounted(true);

      if (userdata?.wishlist) {
        dispatch(setInitialWishlist(userdata.wishlist));
      }
      if (userdata?.cart) {
        dispatch(setInitialCart(userdata.cart));
      } else if (userdata?.card) {
        dispatch(setInitialCart(userdata.card));
      }
    };

    initialize();
  }, [dispatch, userdata?.card, userdata?.cart, userdata?.wishlist]);

  return (
    <nav className={`fixed-top ${style.navbar_container}`}>
      <div className="container-fluid px-4 px-md-5 d-flex align-items-center justify-content-between">
        <Link href="/" className="d-flex align-items-center">
          <MostoreLogo />
        </Link>

        <div className={`${style.nav_links} ${style.desktop_menu}`}>
          <Link href="/" className={style.link}>
            HOME
          </Link>
          <Link href="/man" className={style.link}>
            MEN
          </Link>
          <Link href="/woman" className={style.link}>
            WOMEN
          </Link>
          <Link href="/Child" className={style.link}>
            KIDS
          </Link>
          <Link href="/Admin/dashboard" className={style.link}>
            ADMIN
          </Link>
        </div>

        <div className={style.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>

        <div className={`${style.mobile_menu} ${isOpen ? style.open : ""}`}>
          <Link href="/" onClick={() => setIsOpen(false)}>
            HOME
          </Link>
          <Link href="/man" onClick={() => setIsOpen(false)}>
            MEN
          </Link>
          <Link href="/woman" onClick={() => setIsOpen(false)}>
            WOMEN
          </Link>
          <Link href="/Child" onClick={() => setIsOpen(false)}>
            KIDS
          </Link>
          <Link href="/Admin/dashboard" onClick={() => setIsOpen(false)}>
            ADMIN
          </Link>
          <div className={style.search_container}>
            <input
              type="text"
              placeholder="Search..."
              className={style.searchInput}
            />
            <i
              className={`fa-solid fa-magnifying-glass ${style.search_icon}`}
            ></i>
          </div>
        </div>

        <div className={style.right_section}>
          <div className={style.search_container}>
            <input
              type="text"
              placeholder="Search..."
              className={style.searchInput}
            />
            <i
              className={`fa-solid fa-magnifying-glass ${style.search_icon}`}
            ></i>
          </div>

          <ThemeToggle />

          <div className={style.icon_group}>
            <Link href="/Wishlist" className="relative">
              <i className="fa-regular fa-heart"></i>
              {isMounted && wishlist?.length > 0 && (
                <span className={style.badge}>{wishlist.length}</span>
              )}
            </Link>

            <Link href="/CardPage" className="relative">
              <i className="fa-solid fa-bag-shopping "></i>
              {isMounted && card?.length > 0 && (
                <span className={style.badge}>{card.length}</span>
              )}
            </Link>

            <Link href="/Profile">
              <i className="fa-regular fa-user"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
