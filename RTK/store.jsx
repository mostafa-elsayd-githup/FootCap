"use client"
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistslice";
import cartReducer  from "./cardslice";
// import userReducer from "./userSlice"; // لما تعمله مستقبلاً

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, 
    card: cartReducer,     
    // user: userReducer,      // قسم بيانات المستخدم
  },
});