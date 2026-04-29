"use client";
import { useEffect } from "react";
import style from "./error.module.css"; 
import  Link  from "next/link";
export default function Error({ error, reset }) {
  
  useEffect(() => {
    console.error("Error detected:", error);
  }, []);

  return (
    <div className={style.error_wrapper}>
    
      <div className={style.icon_box}>
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>

      <h1 className={style.title}> Connection error Check your internet connection</h1>
      
      <p className={style.description}>
       There appears to be a temporary server outage or an internet connection interruption.
      </p> 

      <div className={style.button_group}>
       
        <button
          onClick={() => reset()}
          className={style.btn_reset}
        >
          Reloade
        </button>
        <Link
        href="/"
          className={style.btn_home}
        >
          back to home
        </Link>
      </div>
    </div>
  );
}