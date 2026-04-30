"use client";
import { useState, useEffect, useActionState } from "react";
import styles from "./ckeckout.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Card } from "react-bootstrap";
import handleOrder from "./ckeckoutServer";
export default function CheckoutPage({ cartItems }) {
  const router = useRouter();
  const [pendingclient, setPending] = useState(false);
  // const [actionTypeState, setActionTypeState] = useState("");
  const [FormDataClient, setFormDataClient] = useState({
    fullName: "",
    val: "",
    address: "",
    card: "",
    phone: "",
    city: "",
  });
  const initialState = { message: "", wishliststate: null };
  const [state, formAction, pending] = useActionState(
    handleOrder,
    initialState,
  );

  const subtotal =
    cartItems?.reduce(
      (acc, item) => acc + item?.price.replace(/[^\d.]/g, "") * item?.quantity,
      0,
    ) || 0;

  const shipping = 50;
  const total = subtotal + shipping;
  const egyptGovernorates = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Dakahlia",
    "Red Sea",
    "Beheira",
    "Fayoum",
    "Gharbia",
    "Ismailia",
    "Menofia",
    "Minya",
    "Qalyubia",
    "New Valley",
    "Suez",
    "Aswan",
    "Assiut",
    "Beni Suef",
    "Port Said",
    "Damietta",
    "Sharkia",
    "South Sinai",
    "Kafr El Sheikh",
    "Matrouh",
    "Luxor",
    "Qena",
    "North Sinai",
    "Sohag",
  ];
  useEffect(() => {
    // Validate
    if (state?.inputState === 100) {
      Swal.fire("Error", `${state?.message}`, "error");
    } else if (
      state?.inputState === 101 ||
      state?.inputState === 102 ||
      state?.inputState === 103
    ) {
      Swal.fire("Error", `${state?.message}`, "error");
    } else if (state?.success) {
      setTimeout(() => {
        // setPending(false);
        Swal.fire({
          title: "Order Placed!",
          text: "Your order has been received successfully.",
          icon: "success",
          confirmButtonColor: "#000",
        }).then(() => {
          router.push("/");
        });
      }, 2000);
    }

    // setPending(true);
  }, [
    state?.timeStamp,
    state?.inputState,
    state?.success,
    state?.message,
    router,
  ]);

  return (
    <div className={styles.checkoutContainer}>
      {pendingclient && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}

      <div className={styles.shippingSection}>
        <h2 className={styles.title}>Shipping Information</h2>
        <form action={formAction}>
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
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                setFormDataClient({ ...FormDataClient, phone: e.target.value });
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
              maxLength={16}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                let formattedVal = val.match(/.{1,4}/g)?.join(" ") || "";
                setFormDataClient({
                  ...FormDataClient,
                  card: e.target.value,
                });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City {`[${egyptGovernorates.length}]`}</label>
            <input
              list="egypt-cities"
              className={styles.inputField}
              placeholder="Seleck city...."
              onChange={(e) =>
                setFormDataClient({ ...FormDataClient, city: e.target.value })
              }
            />
            <datalist id="egypt-cities">
              {egyptGovernorates.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </div>
          <button
            type="submit"
            className={styles.orderBtn}
            // onMouseDown={() => {
            //   setActionTypeState("submitaction");
            // }}
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
          {/* products Data  */}
          {cartItems.map((item) => (
            <div key={item.id}>
              <input
                type="hidden"
                name="allProducts"
                value={JSON.stringify(item)}
              />
            </div>
          ))}
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
                <p className={{ fontWeight: "700" }}>EGP {item.price}</p>
                {item.quantity > 1 ? (
                  <p style={{ fontWeight: "700", color:"#ff5f5f" }}>
                    EGP {(Number(item.price.replace(/,/g, "")) * item.quantity).toLocaleString()}
                  </p>
                ) : (
                  ""
                )}
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
            <span>EGP {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
