"use client";
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: [], 
  },
  
  reducers: {
  
    toggleWishlistOptimistic: (state, action) => {
      const product = action.payload;

          
      const exists = state.items.some((item) =>  Number(item.id) === Number(product.id));
      
      if (exists) {
        state.items = state.items.filter((item) => Number(item.id) !== Number(product.id));
      } else {
        state.items.push(product);
      }
    },
    rollbackWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      
      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    },

   
    setInitialWishlist: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { toggleWishlistOptimistic, rollbackWishlist, setInitialWishlist } = wishlistSlice.actions;


export default wishlistSlice.reducer;