"use client";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Link from "next/link";
import style from "./navbar.module.css";
import ThemeToggle from "../button/button";
function NavBar({productCount}) {
  
  return (
    <Navbar expand="lg" className={`fixed-top ${style.navbar_container}`}>
      <div className="container-fluid py-1 px-md-5 d-flex align-items-center">
        <Link href="/" className="navbar-brand">
          <Image
            src="/logo.svg"
            alt="logo"
            width={80}
            height={40}
            className="dark:invert"
          />
        </Link>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={style.icon_mobile}
        />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={style.navbar_collapse_custom}
        >
          <Nav className="mx-auto">
            <Link href="/" className={style.link}>
              HOME
            </Link>
            <Link
              href="/Components/Collection/man_colliction"
              className={style.link}
            >
              MEN
            </Link>
            <Link
              href="/Components/Collection/woman_colliction"
              className={style.link}
            >
              WOMEN
            </Link>
            <Link
              href="/Components/Collection/Child_Colliction"
              className={style.link}
            >
              KIDS
            </Link>
            <Link href="/CardPage" className={style.link}>
              CARED
            </Link>
            <Link href="/login" className={style.link}>
              LOGIN
            </Link>
            <Link href="/Profile" className={style.link}>
              PROFILE
            </Link>

            <Link href="/register" className={style.link}>
              REGISTRE
            </Link>
          </Nav>

          <div className={style.icon_group}>
            <div className={style.search_container}>
              <input
                type="text"
                placeholder="Search"
                className={style.searchInput}
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <ThemeToggle />

            <Link href="/Wishlist" className={style.icon_link}>
              <i className="fa-regular fa-heart"></i>
              {productCount && productCount.wishlist?.length ? (
                <span className={style.badge}>{productCount.wishlist?.length}</span>
              ) : null}
            </Link>

            <Link href="/CardPage" className={style.icon_link}>
              <i className="fa-solid fa-bag-shopping"></i>
              {productCount && productCount.cart.length > 0 ? (
                <span className={style.badge}>{productCount.cart?.length || 0}</span>
              ) : null}
            </Link>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
