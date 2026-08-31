"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import style from "./navbar.module.css";
import ThemeToggle from "@/Components/button/button";
import { useSelector, useDispatch } from "react-redux";
import { setInitialCart } from "@/RTK/cardslice";
import { setInitialWishlist } from "@/RTK/wishlistslice";
import MostoreLogo from "@/Components/my_logo/logo";

const getGuestItems = (key) => {
  if (typeof window === "undefined") return [];

  try {
    const storedValue = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(storedValue) ? storedValue : [];
  } catch {
    return [];
  }
};

const normalizeCartKey = (item) => {
  const rawId = String(item?.id ?? "");
  const size = item?.sizes ?? item?.size ?? "";

  if (!rawId) return "";
  if (rawId.includes("-")) return rawId;
  if (size !== "") return `${rawId}-${String(size)}`;

  return rawId;
};

const mergeCartItems = (savedCart = [], guestCart = []) => {
  const merged = Array.isArray(savedCart) ? [...savedCart] : [];

  guestCart.forEach((item) => {
    const key = normalizeCartKey(item);
    const guestQuantity = Number(item?.quantity || 1);
    const existingIndex = merged.findIndex(
      (savedItem) => normalizeCartKey(savedItem) === key,
    );

    if (existingIndex !== -1) {
      merged[existingIndex].quantity =
        Number(merged[existingIndex].quantity || 1) + guestQuantity;
      return;
    }

    merged.push({ ...item, quantity: guestQuantity });
  });

  return merged;
};

const mergeWishlistItems = (savedWishlist = [], guestWishlist = []) => {
  const merged = Array.isArray(savedWishlist) ? [...savedWishlist] : [];

  guestWishlist.forEach((item) => {
    const itemId = String(item?.id ?? "");
    const alreadyExists = merged.some(
      (savedItem) => String(savedItem?.id ?? "") === itemId,
    );

    if (!alreadyExists) {
      merged.push(item);
    }
  });

  return merged;
};

function NavBar({ userdata }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const pathname = usePathname();
  const wishlist = useSelector((state) => state.wishlist.items);
  const card = useSelector((state) => state.card.items);
  const syncGuestDataRef = useRef(false);

  useEffect(() => {
    const initialize = () => {
      setIsMounted(true);

      if (userdata?.wishlist) {
        dispatch(setInitialWishlist(userdata.wishlist));
      } else {
        const localWishlist = getGuestItems("guest_wishlist");
        dispatch(setInitialWishlist(localWishlist));
      }
      if (userdata?.cart) {
        dispatch(setInitialCart(userdata.cart));
      } else {
        const localCard = getGuestItems("guest_cart");
        dispatch(setInitialCart(localCard));
      }
    };

    initialize();
    const syncGuestWishlist = () => {
      if (!userdata) {
        const localWishlist = getGuestItems("guest_wishlist");
        dispatch(setInitialWishlist(localWishlist));
      }
    };

    if (userdata && !syncGuestDataRef.current) {
      const syncGuestData = async () => {
        const guestCart = getGuestItems("guest_cart");
        const guestWishlist = getGuestItems("guest_wishlist");

        if (!guestCart.length && !guestWishlist.length) {
          syncGuestDataRef.current = true;
          return;
        }

        try {
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          );

          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();

          if (userError || !user) return;

          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("cart, wishlist")
            .eq("id", user.id)
            .single();

          if (profileError) return;

          const mergedCart = mergeCartItems(profile?.cart || [], guestCart);
          const mergedWishlist = mergeWishlistItems(
            profile?.wishlist || [],
            guestWishlist,
          );

          const { error: updateError } = await supabase
            .from("profiles")
            .update({ cart: mergedCart, wishlist: mergedWishlist })
            .eq("id", user.id);

          if (!updateError) {
            localStorage.removeItem("guest_cart");
            localStorage.removeItem("guest_wishlist");
            dispatch(setInitialCart(mergedCart));
            dispatch(setInitialWishlist(mergedWishlist));
            window.dispatchEvent(new Event("guest_cart_updated"));
            window.dispatchEvent(new Event("guest_wishlist_updated"));
          }
        } catch (error) {
          console.error("Failed to merge guest data:", error);
        } finally {
          syncGuestDataRef.current = true;
        }
      };

      syncGuestData();
    }

    window.addEventListener("guest_wishlist_updated", syncGuestWishlist);

    return () => {
      window.removeEventListener("guest_wishlist_updated", syncGuestWishlist);
    };
  }, [dispatch, userdata, userdata?.cart, userdata?.wishlist]);

  const baseNavItems = [
    { name: "HOME", href: "/" },
    { name: "MEN", href: "/man" },
    { name: "WOMEN", href: "/woman" },
    { name: "KIDS", href: "/Child" },
    { name: "PROFILE", href: "/Profile" },
  ];
  const navItems = [...baseNavItems];
  if (userdata?.role === "admin") {
    navItems.push({ name: "ADMIN", href: "/Admin" });
  }
  const checkIsActive = (itemHref) => {
    if (!pathname) return false;
    if (itemHref === "/") {
      return pathname === "/";
    }
    const currentPath = pathname.toLowerCase();
    const targetHref = itemHref.toLowerCase();

    return currentPath.startsWith(targetHref);
  };

  return (
    <nav className={`fixed-top ${style.navbar_container}`}>
      <div className="container-fluid px-4 px-md-5 d-flex align-items-center justify-content-between">
        <Link href="/" className="d-flex align-items-center">
          <MostoreLogo />
        </Link>
        <>
          <div className={`${style.nav_links} ${style.desktop_menu}`}>
            {navItems.map((item) => {
              const isActive = checkIsActive(item.href);
              const targetHref =
                item.href === "/Admin" ? "/Admin/dashboard" : item.href;
              return (
                <Link
                  key={item.href}
                  href={targetHref}
                  className={`${style.link} ${isActive ? style.activeLink : ""}`}
                >
                  {item.name}
                </Link>
              );
            })}
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
            </div>
          </div>
        </>

        <div className={style.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>

        <div className={`${style.mobile_menu} ${isOpen ? style.open : null}`}>
          {navItems.map((item) => {
            const isActive = checkIsActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href === "/Admin" ? "/Admin/dashboard" : item.href}
                className={`${style.mobilelink} ${isActive ? style.activeLink : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
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
      </div>
    </nav>
  );
}

export default NavBar;
