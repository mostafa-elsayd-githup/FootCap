// "use client";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// export const fetchLiverpool_sheart = createAsyncThunk(
//   "ProductSlice/fetchLiverpool_sheart",
//   async () => {
//     const res = await fetch("http://localhost:1200/products");
//     const data = await res.json();
//     return data;
//   }
// );


// const ProductSlice = createSlice({
//   name: "ProductSlice",

//   initialState: {
//     Liverpool_sheart: [],
//     CardStore:[]
//   },
  
//   reducers: {
//   },
//   extraReducers: (bullder) => {
//     bullder.addCase(fetchLiverpool_sheart.pending, (state, action) => {
//       state.loading = true;
//     });

//     bullder.addCase(fetchLiverpool_sheart.rejected, (state, action) => {
//       state.error = action.error.message;
//       state.loading = false;
//     });

//     bullder.addCase(fetchLiverpool_sheart.fulfilled, (state, action) => {
//       state.Liverpool_sheart = action.payload;
//       state.loading = false;
//     });

//   },
// });
// export const {} = ProductSlice.actions;
// export default ProductSlice.reducer;
