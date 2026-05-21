"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./navbar.module.css";
import ThemeToggle from "../button/button";

function NavBar({ productCount }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? style.bottom_tab_active : "";

  return (
    <>

      <nav className={`fixed-top ${style.navbar_container}`}>
        <div className="container-fluid px-4 px-md-5 d-flex align-items-center justify-content-between">
          
      
          <Link href="/" className="d-flex align-items-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={80}
              height={40}
              className="dark:invert"
              priority
            />
          </Link>


          <div className={`${style.nav_links} ${style.desktop_only}`}>
            <Link href="/" className={style.link}>HOME</Link>
            <Link href="/Components/Collection/man_colliction" className={style.link}>MEN</Link>
            <Link href="/Components/Collection/woman_colliction" className={style.link}>WOMEN</Link>
            <Link href="/Components/Collection/Child_Colliction" className={style.link}>KIDS</Link>
            <Link href="/Components/dashboard" className={style.link}>ADMIN</Link>
          </div>

       
          <div className={style.right_section}>
        
            <div className={style.search_container}>
              <input
                type="text"
                placeholder="Search products..."
                className={style.searchInput}
              />
              <i className={`fa-solid fa-magnifying-glass ${style.search_icon}`}></i>
            </div>

            <ThemeToggle />
            <div className={`${style.icon_group} ${style.desktop_only}`}>
              <Link href="/Wishlist" className={style.icon_link}>
                <i className="fa-regular fa-heart"></i>
                {productCount?.wishlist?.length > 0 && (
                  <span className={style.badge}>{productCount.wishlist.length}</span>
                )}
              </Link>

              <Link href="/CardPage" className={style.icon_link}>
                <i className="fa-solid fa-bag-shopping"></i>
                {productCount?.cart?.length > 0 && (
                  <span className={style.badge}>{productCount.cart.length}</span>
                )}
              </Link>

              <Link href="/Profile" className={style.icon_link}>
                <i className="fa-regular fa-user"></i>
              </Link>
            </div>
          </div>

        </div>
      </nav>
 
      <div className={style.bottom_nav}>
        <Link href="/" className={`${style.bottom_tab} ${isActive("/")}`}>
          <div className={style.icon_wrapper_mobile}>
            <i className="fa-solid fa-house"></i>
          </div>
          <span>Home</span>
        </Link>

        <Link href="/Components/Collection/man_colliction" className={`${style.bottom_tab} ${isActive("/Components/Collection/man_colliction")}`}>
          <div className={style.icon_wrapper_mobile}>
            <i className="fa-solid fa-icons"></i>
          </div>
          <span>Shop</span>
        </Link>

        <Link href="/Wishlist" className={`${style.bottom_tab} ${isActive("/Wishlist")}`}>
          <div className={style.icon_wrapper_mobile}>
            <i className="fa-regular fa-heart"></i>
            {productCount?.wishlist?.length > 0 && (
              <span className={style.badge}>{productCount.wishlist.length}</span>
            )}
          </div>
          <span>Wishlist</span>
        </Link>

        <Link href="/CardPage" className={`${style.bottom_tab} ${isActive("/CardPage")}`}>
          <div className={style.icon_wrapper_mobile}>
            <i className="fa-solid fa-bag-shopping"></i>
            {productCount?.cart?.length > 0 && (
              <span className={style.badge}>{productCount.cart.length}</span>
            )}
          </div>
          <span>Cart</span>
        </Link>

        <Link href="/Profile" className={`${style.bottom_tab} ${isActive("/Profile")}`}>
          <div className={style.icon_wrapper_mobile}>
            <i className="fa-regular fa-user"></i>
          </div>
          <span>Profile</span>
        </Link>
      </div>
    </>
  );
}

export default NavBar;