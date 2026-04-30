"use client";
import { useState, useActionState } from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faRightLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardPage.module.css";
import Footer from "../footer/Footre";
import DeleteCart, { clearCart } from "./Action";
import Link from "next/link";

const CartPage = ({ card }) => {
  const intinaldata = { massage: "", state: null };
  const [state, formAction, pending] = useActionState(DeleteCart, intinaldata);
  const [, formActionclear, pendingclear] = useActionState(clearCart, intinaldata);

  const [ActionState, setActionState] = useState("");

  return (
    <>
      <Container className={styles.cart_wrapper}>
        {/* Loader */}
        {(pending || pendingclear) && (
          <div className={styles.overlayaction}>
            <div className={styles.halfCircleLoader}></div>
          </div>
        )}

        <Row>
          {/* الجزء الأيسر: قائمة المنتجات */}
          <h2 className={styles.bag_title}>
            YOUR BAG {""}
            <span className={styles.item_count}>
              ({card.length} Unreserved Item)
            </span>
          </h2>
          
          <Col lg={8} md={12}>
            <div className={styles.products_main_container}>
              {/* منطقة سكرول للمنتجات فقط */}
              <div className={styles.products_scroll_area}>
                {card && card.length > 0 ? (
                  card.map((item) => (
                    <div key={item.id} className={styles.product_row}>
                      <form action={formAction} onClick={(e) => e.stopPropagation()}>
                        <button
                          className={styles.delete_btn}
                          type="submit"
                          disabled={pending}
                          onMouseDown={() => setActionState("delete")}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <input type="hidden" name="id" value={item.id || ""} />
                        <input type="hidden" name="intent" value={ActionState} />
                      </form>

                      <div className={styles.product_img}>
                        <img src={item.image} alt="product" />
                      </div>
                      <div className={styles.product_info}>
                        <div className="d-flex justify-content-between align-items-start mr-0">
                          <div>
                            <h5 className={styles.p_name}>{item.name}</h5>
                            <p className={styles.p_variant}>Category: {item.category}</p>
                            <p className={styles.p_size}>Size: {item.size}</p>
                            {item.quantity > 1 && <p className={styles.addedTime}>Qty: {item.quantity}</p>}
                          </div>
                          <div className="text-end">
                            <span className={styles.new_price}>EGP {item.price}</span>
                            {item.quantity > 1 && (
                              <span className={styles.total_price}>
                                Total: EGP {(parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.empty_state}>
                    <h3>YOUR CART IS EMPTY</h3>
                    <p>Add items to your cart to see them here.</p>
                  </div>
                )}
              </div>

              {/* زرار Clear All ثابت في أسفل حاوية المنتجات */}
              {card.length >= 2 && (
                <div className={styles.sticky_clear_container}>
                  <form action={formActionclear} onClick={(e) => e.stopPropagation()}>
                    <input type="hidden" name="intent" value={ActionState} />
                    <button
                      className={styles.clear_but}
                      type="submit"
                      disabled={pendingclear}
                      onMouseDown={() => setActionState("clear")}
                    >
                      Clear All Shopping Bag
                    </button>
                  </form>
                </div>
              )}
            </div>
          </Col>

          {/* الجزء الأيمن: Summary */}
          <Col lg={4} md={12}>
            <div className={styles.summary_sticky_wrapper}>
              <div className={styles.summary_card}>
                <h4 className={styles.summary_header}>ORDER SUMMARY</h4>
                <div className={styles.summary_row}>
                  <span>SUBTOTAL</span>
                  <span>EGP {card.reduce((acc, item) => acc + (parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity), 0).toLocaleString()}</span>
                </div>
                <div className={styles.summary_row}>
                  <span>DELIVERY</span>
                  {card.length > 4 ? <span>EGP 400</span> : <span>FREE</span>}
                </div>
                <div className={`${styles.summary_row} ${styles.total_row}`}>
                  <span>TOTAL</span>
                  <span>EGP {card.reduce((acc, item) => acc + (parseFloat(item.price.toString().replace(/[^\d.]/g, "")) * item.quantity), 0).toLocaleString()}</span>
                </div>
                <Link href="/CardPage/ckecout/" className={styles.checkout_button}>
                  CHECKOUT <FontAwesomeIcon icon={faRightLong} />
                </Link>
                <div className={styles.payment_section}>
                  <p>ACCEPTED PAYMENT METHODS</p>
                  <span className={styles.payment_placeholder}>VISA / PAYPAL / COD</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;