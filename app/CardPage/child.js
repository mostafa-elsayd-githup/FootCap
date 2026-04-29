"use client";
import { useState } from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardPage.module.css";
import Footer from "../footer/Footre";
import { useActionState } from "react";
import DeleteCart, { clearCart } from "./Action";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const CartPage = ({ card }) => {
  const intinaldata = { massage: "", state: null };
  const [state, formAction, pending] = useActionState(DeleteCart, intinaldata);
  const [, formActionclear, pendingclear] = useActionState(
    clearCart,
    intinaldata,
  );

  const [ActionState, setActionState] = useState("");

  return (
    <>
      <Container className={styles.cart_wrapper}>
        {/* loader */}
        {pending || pendingclear ? (
          <div className={styles.overlayaction}>
            <div className={styles.halfCircleLoader}></div>
          </div>
        ) : (
          ""
        )}
        <Row>
          {/* الجزء الأيسر: قائمة المنتجات */}
          <h2 className={styles.bag_title}>
            YOUR BAG {""}
            <span className={styles.item_count}>
              ({card.length} Unreserved Item)
            </span>
          </h2>
          <Col lg={8} md={12} className={styles.products_col}>
            {/* كارت منتج واحد Static */}

            {card &&
              card.map((item) => {
                return (
                  <div key={item.id} className={styles.product_row}>
                    <form
                      action={formAction}
                      onClick={(e) => e.stopPropagation()}
                    >
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
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className={styles.stor}>
                            <h5 className={styles.p_name}>{item.name}</h5>
                            {/* {item.quantity >= 5 ? (
                              <span className={styles.lowStock}>
                                Low stock: Only ({item.productId})
                              </span> // <= this logic to test only
                            ) : (
                              <span className={styles.inStock}>✓ In stock</span>
                            )} */}
                          </div>
                          <p className={styles.p_variant}>
                            Category :{item.category}
                          </p>
                          <p className={styles.p_size}>Size: {item.size}</p>
                          {item.quantity > 1 && (
                            <span className="m-1">Qun : {item.quantity}</span>
                          )}
                        </div>
                        <div className="text-end">
                          <div className={styles.price_box}>
                            <span className={styles.new_price}>
                              price : EGP {item.price}
                            </span>
                            {item.oldPrice && (
                              <span className={styles.old_price}>
                                EGP {item.oldPrice}
                              </span>
                            )}
                            {item.quantity != 1 && (
                              <span className={styles.total_price}>
                                <span className={styles.new_price}>
                                  Total :
                                </span>
                                EGP{" "}
                                {item.quantity === "string"
                                  ? (
                                      parseFloat(
                                        item.price.replace(/[^\d.]/g, ""),
                                      ) * item.quantity
                                    ).toLocaleString()
                                  : (
                                      parseFloat(
                                        item.price.replace(/[^\d.]/g, ""),
                                      ) * item.quantity
                                    ).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {card.length === 0 && (
              <div className={styles.empty_state}>
                <h3>YOUR CART IS EMPTY</h3>
                <p>Add items to your cart to see them here.</p>
              </div>
            )}

            {card.length >= 2 ? (
              <div className="text-end mt-3">
                <form
                  action={formActionclear}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input type="hidden" name="intent" value={ActionState} />
                  <button
                    className={styles.clear_but}
                    type="submit"
                    disabled={pending}
                    onMouseDown={() => setActionState("clear")}
                  >
                    clear
                  </button>
                </form>
              </div>
            ) : (
              ""
            )}
          </Col>

          {/* الجزء الأيمن: order price  */}
          <Col lg={4} md={12}>
            <div className={styles.summary_card}>
              <h4 className={styles.summary_header}>ORDER SUMMARY</h4>

              <div className={styles.summary_row}>
                <span>SUBTOTAL</span>
                <span>
                  EGP{" "}
                  {card
                    .reduce((total, item) => {
                      const cleanPrice =
                        typeof item.price === "string"
                          ? item.price.replace(/[^\d.]/g, "")
                          : item.price;
                      const price = parseFloat(cleanPrice) || 0;
                      return total + price;
                    }, 0)
                    .toLocaleString()}
                </span>
              </div>

              <div className={styles.summary_row}>
                <span>DELIVERY</span>
                {card.length > 4 ? <span>FREE</span> : <span>EGP 0</span>}
              </div>

              <p className={styles.shipping_promo}>
                You unlocked Free Shipping!
              </p>

              <div className={`${styles.summary_row} ${styles.total_row}`}>
                <span>TOTAL</span>
                <span>
                  EGP{" "}
                  {card
                    .map((item) => {
                      const cleanPrice =
                        typeof item.price === "string"
                          ? item.price.replace(/[^\d.]/g, "")
                          : item.price;
                      const price = parseFloat(cleanPrice) || 0;
                      return price * item.quantity;
                    })
                    .reduce((total, price) => total + price, 0)
                    .toLocaleString()}
                </span>
              </div>

              <Link href="/CardPage/ckecout/" className={styles.checkout_button}>
                CHECKOUT <FontAwesomeIcon icon={faRightLong} />
              </Link>

              <div className={styles.promo_link}>ENTER PROMO CODE</div>

              <div className={styles.payment_section}>
                <p>ACCEPTED PAYMENT METHODS</p>
                <div className={styles.payment_icons}>
                  {/* حط هنا صور الفيزا والبايبال */}
                  <span className={styles.payment_placeholder}>
                    VISA / PAYPAL / COD
                  </span>
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
