"use client";
import { useState, useActionState } from "react";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faRightLong,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./CardPage.module.css";
import DeleteCart, { clearCart } from "./Action";
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
      <main className={styles.cart_wrapper}>
        {(pending || pendingclear) && (
          <div
            className={`${styles.overlayaction} ${pending || pendingclear ? styles.active : ""}`}
          >
            <div className={styles.halfCircleLoader}></div>
          </div>
        )}
        <Container>
          <h2 className={styles.bag_title}>
            YOUR BAG
            <span className={styles.item_count}>
              ( {card.length} {card.length === 1 ? "Item" : "Items"} )
            </span>
          </h2>

          <Row className="gy-4">
            <Col lg={8} md={12}>
              <div className={styles.products_main_container}>
                <div className={styles.products_scroll_area}>
                  {card && card.length > 0 ? (
                    card.map((item) => {
                      const price = Intl.NumberFormat("en", {
                        notation: "standard",
                        style: "currency",
                        currency: "EGP",
                        minimumFractionDigits: 0,
                      }).format(parseInt(item.price));

                      return (
                        <div key={item.id} className={styles.product_card}>
                          {console.log(item)}
                          <form
                            action={formAction}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className={styles.delete_btn}
                              type="submit"
                              disabled={pending}
                              aria-label="Remove item"
                              onMouseDown={() => setActionState("delete")}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <input
                              type="hidden"
                              name="id"
                              value={item.id || ""}
                            />
                            <input
                              type="hidden"
                              name="intent"
                              value={ActionState}
                            />
                          </form>
                          <div className={styles.product_img_wrapper}>
                            <Card.Img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                            />
                          </div>
                          <div className={styles.product_details_content}>
                            <div className={styles.details_main_info}>
                              <div>
                                <h3 className={styles.p_name}>{item.name}</h3>
                                <p className={styles.p_meta}>
                                  Category: <span>{item.category}</span>
                                </p>
                                <p className={styles.p_meta}>
                                  Size:{" "}
                                  <span className={styles.badge_size}>
                                    {item.sizes || item.size}
                                  </span>
                                </p>
                              </div>
                              <div className={styles.price_box}>
                                <span className={styles.unit_price}>
                                  {price}
                                </span>
                                {item.quantity >= 1 && (
                                  <span className={styles.qty_badge}>
                                    Qty: {item.quantity}
                                  </span>
                                )}
                              </div>
                            </div>
                            {item.quantity > 1 && (
                              <div className={styles.card_footer_total}>
                                <span>Subtotal for this item:</span>
                                <span className={styles.total_price_text}>
                                  EGP{" "}
                                  {(
                                    parseFloat(
                                      item.price
                                        .toString()
                                        .replace(/[^\d.]/g, ""),
                                    ) * item.quantity
                                  ).toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.empty_state}>
                      <h3>YOUR CART IS EMPTY</h3>
                      <p>Add items to your cart to see them here.</p>
                      <Link href="/" className={styles.shop_now_link}>
                        SHOP OUR COLLECTION
                      </Link>
                    </div>
                  )}
                </div>
                {card.length >= 2 && (
                  <div className={styles.sticky_clear_container}>
                    <form
                      action={formActionclear}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input type="hidden" name="intent" value={ActionState} />
                      <button
                        className={styles.clear_all_button}
                        type="submit"
                        disabled={pendingclear}
                        onMouseDown={() => setActionState("clear")}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{ marginRight: "8px", fontSize: "14px" }}
                        />
                        Clear All Shopping Bag
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className={styles.summary_sticky_wrapper}>
                <section className={styles.summary_card}>
                  <h4 className={styles.summary_header}>ORDER SUMMARY</h4>

                  <div className={styles.summary_row}>
                    <span className={styles.row_label}>SUBTOTAL</span>
                    <span className={styles.row_value}>
                      EGP{" "}
                      {card
                        .reduce(
                          (acc, item) =>
                            acc +
                            parseFloat(
                              item.price.toString().replace(/[^\d.]/g, ""),
                            ) *
                              item.quantity,
                          0,
                        )
                        .toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.summary_row}>
                    <span className={styles.row_label}>DELIVERY</span>
                    <span className={styles.row_value_free}>
                      {card.length > 4 ? "EGP 400" : "FREE"}
                    </span>
                  </div>

                  <div className={`${styles.summary_row} ${styles.total_row}`}>
                    <span className={styles.total_label}>TOTAL INCL. VAT</span>
                    <span className={styles.total_value}>
                      EGP{" "}
                      {card
                        .reduce(
                          (acc, item) =>
                            acc +
                            parseFloat(
                              item.price.toString().replace(/[^\d.]/g, ""),
                            ) *
                              item.quantity,
                          0,
                        )
                        .toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href="/CardPage/ckecout/"
                    className={styles.checkout_button}
                  >
                    PROCEED TO CHECKOUT{" "}
                    <FontAwesomeIcon
                      icon={faRightLong}
                      className={styles.arrow_icon}
                    />
                  </Link>

                  <div className={styles.payment_section}>
                    <p className={styles.payment_title}>
                      ACCEPTED PAYMENT METHODS
                    </p>
                    <div className={styles.payment_badges}>
                      <span>VISA</span>
                      <span>MASTERCARD</span>
                      <span>PAYPAL</span>
                      <span>CASH ON DELIVERY</span>
                    </div>
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

    </>
  );
};

export default CartPage;
