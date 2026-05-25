"use client";
import style from "./error.module.css"; 
import  Link  from "next/link";
export default function Error({ error, reset }) {
  return (
    <div className={style.error_wrapper}>
    
      <div className={style.icon_box}>
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>

      <h1 className={style.title}> Connection error Check your internet connection</h1>
      
      <p className={style.description}>
     {error.message}
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