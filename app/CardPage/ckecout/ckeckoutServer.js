"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { timeStamp } from "node:console";
import { number } from "motion";
import { revalidateTag } from "next/cache";

export default async function handleOrder(prevstate, formData) {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  const fullName = formData.get("fullName");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const card = formData.get("card");
  const allProducts = formData.getAll("allProducts");

  const isInvalid =
    !fullName.trim() || !address.trim() || !phone.trim() || !city || !card;
  if (isInvalid)
    return {
      inputState: 100,
      timeStamp: Date.now(),
      message: "Please fill all fields",
    };
  const phoneHasLetters = /\D/.test(phone.replace(/\s/g, ""));
  if (phoneHasLetters) {
    return {
      inputState: 101,
      timeStamp: Date.now(),
      message: "Phone must contain numbers only",
    };
  }
  const cardNumbersOnly = card.replace(/\s/g, "");
  const cardHasLetters = /\D/.test(cardNumbersOnly);
  if (cardHasLetters) {
    return {
      inputState: 102,
      timeStamp: Date.now(),
      message: "Card must contain numbers only",
    };
  }
  if (cardNumbersOnly.length < 16) {
    return {
      inputState: 103,
      timeStamp: Date.now(),
      message: "Card must be 16 Digits",
    };
  }
  const order = {
    fullName,
    phone,
    address,
    city,
    card,
    createdAt: new Date().toISOString(),
    products: allProducts,
  };

  try {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
      cache: "no-store",
    });
    const userData = await res.json();

    const updatedOrders = [...(userData.order || []), order];

    const patchRes = await fetch(
      `http://localhost:1200/users/${decryption.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: updatedOrders,
          cart: [],
        }),
      },
    );

    if (patchRes.ok) {
      revalidateTag("navbar");
      return { success: true, message: "success", timeStamp: Date.now() };
    }
  } catch {
    console.error("Fetch Error:", error);
    return { inputState: 500, message: "Server Error" };
  }
}

// "use client";
// import { useState, useActionState } from "react";
// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark, faRightLong } from "@fortawesome/free-solid-svg-icons";
// import styles from "./CardPage.module.css";
// import Footer from "../footer/Footre";
// import DeleteCart, { clearCart } from "./Action";
// import Link from "next/link";

// const CartPage = ({ card }) => {
//   const intinaldata = { massage: "", state: null };
//   const [state, formAction, pending] = useActionState(DeleteCart, intinaldata);
//   const [, formActionclear, pendingclear] = useActionState(clearCart, intinaldata);

//   const [ActionState, setActionState] = useState("");

//   return (
//     <>
//       <Container className={styles.cart_wrapper}>
//         {/* Loader */}
//         {(pending || pendingclear) && (
//           <div className={styles.overlayaction}>
//             <div className={styles.halfCircleLoader}></div>
//           </div>
//         )}

//         <Row>
//           {/* الجزء الأيسر: قائمة المنتجات */}
//             <h2 className={styles.bag_title}>
//               YOUR BAG 
//               <span className={styles.item_count}>
//                 ({card.length} Unreserved Item)
//               </span>
//             </h2>
//           <Col lg={8} md={12}>

//             <div className={styles.products_main_container}>
//               {/* منطقة سكرول للمنتجات فقط */}
//               <div className={styles.products_scroll_area}>
//                 {card && card.length > 0 ? (
//                   card.map((item) => (
//                     <div key={item.id} className={styles.product_row}>
//                       <form action={formAction} onClick={(e) => e.stopPropagation()}>
//                         <button
//                           className={styles.delete_btn}
//                           type="submit"
//                           disabled={pending}
//                           onMouseDown={() => setActionState("delete")}
//                         >
//                           <FontAwesomeIcon icon={faXmark} />
//                         </button>
//                         <input type="hidden" name="id" value={item.id || ""} />
//                         <input type="hidden" name="intent" value={ActionState} />
//                       </form>

//                       <div className={styles.product_img}>
//                         <img src={item.image} alt="product" />
//                       </div>
//                       <div className={styles.product_info}>
//                         <div className="d-flex justify-content-between align-items-start">
//                           <div>
//                             <h5 className={styles.p_name}>{item.name}</h5>
//                             <p className={styles.p_variant}>Category: {item.category}</p>
//                             <p className={styles.p_size}>Size: {item.size}</p>
//                             {item.quantity > 1 && <span className={styles.addedTime}>Qty: {item.quantity}</span>}
//                           </div>
//                           <div className="text-end">
//                             <span className={styles.new_price}>EGP {item.price}</span>
//                             {item.quantity > 1 && (
//                               <span className={styles.total_price}>
//                                 Total: EGP {(parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity).toLocaleString()}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className={styles.empty_state}>
//                     <h3>YOUR CART IS EMPTY</h3>
//                     <p>Add items to your cart to see them here.</p>
//                   </div>
//                 )}
//               </div>

//               {/* زرار Clear All ثابت في أسفل حاوية المنتجات */}
//               {card.length >= 2 && (
//                 <div className={styles.sticky_clear_container}>
//                   <form action={formActionclear} onClick={(e) => e.stopPropagation()}>
//                     <input type="hidden" name="intent" value={ActionState} />
//                     <button
//                       className={styles.clear_but}
//                       type="submit"
//                       disabled={pendingclear}
//                       onMouseDown={() => setActionState("clear")}
//                     >
//                       Clear All Shopping Bag
//                     </button>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </Col>

//           {/* الجزء الأيمن: Summary */}
//           <Col lg={4} md={12}>
//             <div className={styles.summary_sticky_wrapper}>
//               <div className={styles.summary_card}>
//                 <h4 className={styles.summary_header}>ORDER SUMMARY</h4>
//                 <div className={styles.summary_row}>
//                   <span>SUBTOTAL</span>
//                   <span>EGP {card.reduce((acc, item) => acc + (parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity), 0).toLocaleString()}</span>
//                 </div>
//                 <div className={styles.summary_row}>
//                   <span>DELIVERY</span>
//                   {card.length > 4 ? <span>FREE</span> : <span>EGP 0</span>}
//                 </div>
//                 <div className={`${styles.summary_row} ${styles.total_row}`}>
//                   <span>TOTAL</span>
//                   <span>EGP {card.reduce((acc, item) => acc + (parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity), 0).toLocaleString()}</span>
//                 </div>
//                 <Link href="/CardPage/ckecout/" className={styles.checkout_button}>
//                   CHECKOUT <FontAwesomeIcon icon={faRightLong} />
//                 </Link>
//                 <div className={styles.payment_section}>
//                   <p>ACCEPTED PAYMENT METHODS</p>
//                   <span className={styles.payment_placeholder}>VISA / PAYPAL / COD</span>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;

// .cart_wrapper {
//   padding: 8rem 0;
//   background-color: var(--bg-main);
// }

// .bag_title {
//   text-transform: uppercase;
//   margin-bottom: 25px;
//   font-size: 2.2rem;
//   font-style: italic;
//   font-weight: 800;
//   color: var(--color-primary);
  
// }

// .item_count {
//   font-weight: 400;
//   font-size: 1.2rem;
//   font-style: normal;
//   margin: 0 10px;
// }

// /* الحاوية الكبيرة للمنتجات */
// .products_main_container {
//   display: flex;
//   flex-direction: column;
//   border: 1px solid var(--border-color);
//   background-color: var(--bg-main);
//   position: relative;
// }

// /* منطقة السكرول للمنتجات */
// .products_scroll_area {
//   max-height: 550px; /* التحكم في طول منطقة المنتجات */
//   overflow-y: auto;
//   padding: 20px;
// }

// /* زرار المسح الثابت تحت منطقة السكرول */
// .sticky_clear_container {
//   padding: 15px 20px;
//   border-top: 1px solid var(--border-color);
//   background-color: var(--bg-main);
// }

// .clear_but {
//   cursor: pointer;
//   color: var(--bg-primary);
//   background: var(--color-primary);
//   border: none;
//   width: 100%;
//   height: 3rem;
//   font-size: 1.2rem;
//   font-weight: 700;
//   text-transform: uppercase;
//   transition: 0.3s;
// }

// .clear_but:hover {
//   opacity: 0.9;
// }

// /* كارت المنتج */
// .product_row {
//   position: relative;
//   display: flex;
//   border: 1px solid var(--border-color);
//   margin-bottom: 20px;
//   padding: 0;
//   color: var(--color-primary);
// }

// .product_img {
//   width: 200px;
//   background-color: #fff;
// }
// .product_img img {
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// }

// .product_info {
//   flex: 1;
//   padding: 20px;
//   color: var(--color-primary);
// }

// .p_name { font-weight: 700; font-size: 1.1rem; margin-bottom: 5px; }
// .p_variant, .p_size { font-size: 1rem; margin-bottom: 2px; color: var(--color-primary); }

// .delete_btn {
//   cursor: pointer;
//   color: var(--color-primary);
//   background: none;
//   border: none;
//   font-size: 1.2rem;
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   z-index: 5;
// }

// .new_price { color: var(--color-primary); font-weight: 700; }
// .total_price { display: block; margin-top: 10px; font-weight: 700; color: #940000; }

// /* Summary Sticky */
// .summary_sticky_wrapper {
//   position: sticky;
//   top: 20px;
// }

// .summary_card {
//   border: 1px solid var(--border-color);
//   padding: 25px;
//   color: var(--color-primary);
// }

// .summary_header { font-weight: 800; margin-bottom: 25px; }

// .summary_row {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 15px;
//   font-size: 0.95rem;
// }

// .total_row {
//   font-weight: 800;
//   border-top: 1px solid var(--color-primary);
//   padding-top: 15px;
//   margin-top: 15px;
// }

// .checkout_button {
//   background: var(--color-primary);
//   width: 100%;
//   color: var(--bg-primary);
//   border: none;
//   margin-top: 20px;
//   padding: 15px;
//   font-weight: 800;
//   display: block;
//   text-align: center;
//   text-decoration: none;
// }

// /* Loader */
// .overlayaction {
//   position: fixed;
//   top: 0; left: 0;
//   width: 100vw; height: 100vh;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center; justify-content: center;
//   z-index: 1000;
// }

// .halfCircleLoader {
//   width: 55px; height: 55px;
//   border: 3px solid transparent;
//   border-right-color: var(--color-primary);
//   border-radius: 50%;
//   animation: spin 0.8s linear infinite;
// }

// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

// @media (max-width: 768px) {
//   .product_row { flex-direction: column; }
//   .product_img { width: 100%; height: 200px; }
//   .products_scroll_area { max-height: none; }
// }

// .empty_state { text-align: center; padding: 60px 0; border: 1px solid var(--color-primary); }