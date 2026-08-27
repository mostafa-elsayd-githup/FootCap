"use client";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);
  if (!mounted) return <div className={styles.placeholder_btn}></div>;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle_btn}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className={styles.icon_container}>
        <div className={`${styles.icon_box} ${isDark ? styles.sun_hide : ""}`}>
          <FontAwesomeIcon icon={faSun} className={styles.sun_icon} />
        </div>

        <div
          className={`${styles.icon_box} ${!isDark ? styles.moon_hide : ""}`}
       >
          <FontAwesomeIcon icon={faMoon} className={styles.moon_icon} />
        </div>
      </div>
    </button>
  );
}
