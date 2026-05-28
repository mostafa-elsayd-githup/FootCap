"use client";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [], 
  },

  reducers: {

    addToCartOptimistic: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      

      if (existingItem) {

        existingItem.quantity += 1;
      } else {

        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCartOptimistic: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
   
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== productId);
        }
      }
    },

   
    rollbackCart: (state, action) => {
      state.items = action.payload;
    },

   
    setInitialCart: (state, action) => {
      state.items = action.payload || [];
    },
  },
});


export const {
  addToCartOptimistic,
  removeFromCartOptimistic,
  rollbackCart,
  setInitialCart,
} = cartSlice.actions;

export default cartSlice.reducer;