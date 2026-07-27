"use client";
import styles from "./ckeckout.module.css";
import { Card } from "react-bootstrap";
import Form from "./form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProcessingOverlay from "./Processing";
export default function CheckoutPage({ cartItems }) {
  const subtotal =
    cartItems?.reduce((acc, item) => acc + item?.price * item?.quantity, 0) ||
    0;
  const shipping = 50;
  const total = subtotal + shipping;
  const stripePromise = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) return null;
    return loadStripe(key);
  }, []);
  return (
    <div className={styles.checkoutContainer}>
      <ProcessingOverlay />
      <div className={styles.shippingSection}>
        <h2 className={styles.title}>Shipping Information</h2>
        <Elements stripe={stripePromise}>
          <Form cartItems={cartItems} />
        </Elements>
      </div>

      <div className={styles.summarySection}>
        <h2 className={styles.title}>Order Summary</h2>
        <div className={styles.itemsScroll}>
          {cartItems?.map((item) => (
            <div key={item.id} className={styles.productItem}>
              <Card.Img
                src={item.image}
                alt={item.name}
                className={styles.productImg}
              />
              <div className={styles.productDetails}>
                <h5>{item.title}</h5>
                <p>
                  Size: {item.size} • Qty: {item.quantity}
                </p>

                <div className={styles.priceContainer}>
                  <span className={styles.itemPrice}>EGP {item.price}</span>
                  {item.quantity > 1 && (
                    <span className={styles.itemTotalPrice}>
                      Total: EGP{" "}
                      {(Number(item.price) * item.quantity).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalTable}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>EGP {subtotal.toLocaleString()}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>EGP {shipping}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total</span>
            <span className={styles.totalAmount}>
              EGP {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
