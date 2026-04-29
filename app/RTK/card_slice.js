
// import { createSlice } from "@reduxjs/toolkit";
// import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart icon
// export const CardSlice = createSlice({
//     name: "CardSlice",
//     initialState: [],
//     reducers: {
//         addToCard: (state, action) => {
//             const findProduct = state.find((product) => product.id === action.payload.id);

//             if ( findProduct) {
//                 findProduct.quantity += 1;
//             } else {
//                 const productClone = { ...action.payload, quantity: 1 };
//                 state.push(productClone);
                
//             }
//         },
//         removeFromCard: (state, action) => {
//             const deletecard = state.filter((product)=> product.id != action.payload)
//             return deletecard;
//         },
//         clearCard: (state, action) => {
//             return [];

//         }
//     },
// })
// export const { addToCard, removeFromCard, clearCard, fivoret } = CardSlice.actions;
// export default CardSlice.reducer;