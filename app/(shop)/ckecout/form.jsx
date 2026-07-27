"use client";
import styles from "./ckeckout.module.css";
import { useRouter } from "next/navigation";
import { useActionState, useState, useEffect, startTransition } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import handleOrder from "@/server/ckeckoutServer";
import ErrorMessage from "./errorMessge";
import { toast } from "sonner";
import ProcessingOverlay from "./Processing";
export default function Form({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeToken, setStripeToken] = useState();

  const router = useRouter();

  const initialState = {
    message: "",
    wishliststate: null,
    success: null,
    inputState: null,
  };
  const [state, formAction, pending] = useActionState(
    handleOrder,
    initialState,
  );
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [FormDataClient, setFormDataClient] = useState({
    fullName: "",
    address: "",
    phone: "",
    city: "",
  });

  const egyptGovernorates = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Dakahlia",
    "Red Sea",
  ];
  useEffect(() => {
    if (state?.inputState) {
      toast.error(state?.message);
    } else if (state?.success) {
      toast.success("Your order has been received successfully");

      startTransition(() => {
        setFormDataClient({
          fullName: "",
          address: "",
          phone: "",
          city: "",
        });
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [state, router]);
  const subtotal =
    cartItems?.reduce((acc, item) => acc + item?.price * item?.quantity, 0) ||
    0;
  const shipping = 50;
  const total = subtotal + shipping;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "cash") {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const formElement = e.currentTarget;
    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error.message);
      return;
    }

    const formData = new FormData(formElement);
    formData.set("stripeToken", token.id);

    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      action={formAction}
      className={styles.formGrid}
    >
      <ProcessingOverlay isopen={pending} />
      <div className={styles.formGroup}>
        <label>Full Name</label>
        <input
          type="text"
          value={FormDataClient.fullName}
          className={styles.inputField}
          placeholder="Enter your full name"
          onChange={(e) =>
            setFormDataClient({
              ...FormDataClient,
              fullName: e.target.value,
            })
          }
        />
        <ErrorMessage message={state?.errors?.fullName} />
      </div>

      <div className={styles.formGroup}>
        <label>Phone Number</label>
        <input
          type="tel"
          value={FormDataClient.phone}
          className={styles.inputField}
          placeholder="01xxxxxxxxx"
          maxLength={11}
          onChange={(e) =>
            setFormDataClient({
              ...FormDataClient,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
        />
        <ErrorMessage message={state?.errors?.phone} />
      </div>

      <div className={styles.formGroup}>
        <label>Detailed Address</label>
        <input
          type="text"
          value={FormDataClient.address}
          className={styles.inputField}
          placeholder="Building, Street, Area"
          onChange={(e) =>
            setFormDataClient({
              ...FormDataClient,
              address: e.target.value,
            })
          }
        />
        <ErrorMessage message={state?.errors?.address} />
      </div>

      <div className={styles.formGroup}>
        <label>City</label>
        <input
          list="egypt-cities"
          value={FormDataClient.city}
          className={styles.inputField}
          placeholder="Select city...."
          onChange={(e) =>
            setFormDataClient({ ...FormDataClient, city: e.target.value })
          }
        />
        <datalist id="egypt-cities">
          {egyptGovernorates.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
        <ErrorMessage message={state?.errors?.city} />
      </div>

      <div className={styles.paymentMethodSection}>
        <h3>Select Payment Method</h3>
        <div className={styles.radioGroup}>
          <label className={paymentMethod === "cash" ? styles.activeRadio : ""}>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />{" "}
            💵 Cash on Delivery
          </label>

          <label className={paymentMethod === "card" ? styles.activeRadio : ""}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />{" "}
            💳 Credit / Debit Card
          </label>
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className={styles.cardDetailsGrid}>
          <div className={styles.formGroup}>
            <label>Card Details</label>
            <div className={styles.stripeWrapper}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      fontFamily: "inherit",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#fa755a",
                      iconColor: "#fa755a",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
      <button type="submit" className={styles.orderBtn}>
        CONFIRM ORDER
      </button>

      <input type="hidden" name="fullName" value={FormDataClient.fullName} />
      <input type="hidden" name="address" value={FormDataClient.address} />
      <input type="hidden" name="phone" value={FormDataClient.phone} />
      <input type="hidden" name="city" value={FormDataClient.city} />
      <input type="hidden" name="paymentMethod" value={paymentMethod} />

      <input type="hidden" name="stripeToken" value={stripeToken || ""} />
      <input type="hidden" name="totalprice" value={total} />

      <input
        type="hidden"
        name="allProducts"
        value={JSON.stringify(cartItems || [])}
      />
    </form>
  );
}
