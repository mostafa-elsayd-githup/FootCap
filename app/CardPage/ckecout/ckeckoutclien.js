"use client";
import { useState, useEffect, useActionState } from "react";
import styles from "./ckeckout.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Form, Card } from "react-bootstrap";
import handleOrder from "./ckeckoutServer";
import { number } from "motion";
export default function CheckoutPage({ cartItems }) {

  const router = useRouter();
  const [pendingclient, setPending] = useState(false);
  const [actionTypeState, setActionTypeState] = useState("");
  const [FormDataClient, setFormDataClient] = useState({
    fullName: "",
    phone: "",
    address: "",
    card: "",
    city: "Cairo",
  });
  const initialState = { message: "", wishliststate: null };
  const [state, formData, pending] = useActionState(handleOrder, initialState);

  const subtotal =
    cartItems?.reduce(
      (acc, item) => acc + item.price.replace(/[^\d.]/g, "") * item.quantity,
      0,
    ) || 0;

  const shipping = 50;
  const total = subtotal + shipping;

  useEffect(() => {
    // Validate
    if (state?.inputState === 100) {
      Swal.fire("Error", "Please fill all fields", "error");
    } else if (state?.inputState === 102) {
      Swal.fire("Error", "Credet Card & Phone Should be a Number", "error");
    }

    // setPending(true);

    // Simulate API Call
    // setTimeout(() => {
    //   // setPending(false);
    //   Swal.fire({
    //     title: "Order Placed!",
    //     text: "Your order has been received successfully.",
    //     icon: "success",
    //     confirmButtonColor: "#000",
    //   }).then(() => {
    //     router.push("/");
    //   });
    // }, 2000);
  }, [state?.inputState]);

  return (
    <div className={styles.checkoutContainer}>
      {pendingclient && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}

      {/* نموذج بيانات الشحن */}
      <div className={styles.shippingSection}>
        <h2 className={styles.title}>Shipping Information</h2>
        <form action={formData} onClick={(e) => e.stopPropagation()}>
          {/* onSubmit={handle} */}
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Enter your full name"
              onChange={(e) =>
                setFormDataClient({
                  ...FormDataClient,
                  fullName: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              className={styles.inputField}
              placeholder="01xxxxxxxxx"
              maxLength={11}
              value={FormDataClient.phone || ""}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                setFormDataClient({ ...FormDataClient, phone: val });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Detailed Address</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Building, Street, Area"
              onChange={(e) =>
                setFormDataClient({
                  ...FormDataClient,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>CredCard</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="0000 0000 0000 0000"
              value={FormDataClient.card || ""}
              maxLength={19}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                let formattedVal = val.match(/.{1,4}/g)?.join(" ") || "";
                setFormDataClient({
                  ...FormDataClient,
                  card: formattedVal,
                });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <select
              className={styles.inputField}
              onChange={(e) =>
                setFormDataClient({ ...FormDataClient, city: e.target.value })
              }
            >
              <option value="Cairo">Cairo</option>
              <option value="Giza">Giza</option>
              <option value="Alexandria">Alexandria</option>
            </select>
          </div>
          <button
            type="submit"
            className={styles.orderBtn}
            onMouseDown={() => {
              setActionTypeState("submitaction");
            }}
          >
            CONFIRM ORDER
          </button>
          {/* use data */}
          <input
            type="hidden"
            name="fullName"
            value={FormDataClient.fullName}
          />
          <input type="hidden" name="address" value={FormDataClient.address} />
          <input type="hidden" name="phone" value={FormDataClient.phone} />
          <input type="hidden" name="city" value={FormDataClient.city} />
          <input type="hidden" name="card" value={FormDataClient.card} />
          <input type="hidden" name="actionTypeState" value={actionTypeState} />
          {/* products Data  */}
          <input type="hidden" name="allProducts" value={JSON.stringify(cartItems)} />
        </form>
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
                <h5>{item.name}</h5>
                <p>Size: {item.size}</p>
                <p>Qty: {item.quantity}</p>
                <p style={{ fontWeight: "700" }}>EGP {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalTable}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>EGP {subtotal}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>EGP {shipping}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total</span>
            <span>EGP {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
