"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const DeleteCart = async (prevstate, formData) => {
  const actionTypeState = formData.get("intent");
  const id = formData.get("id");

  const cookieStors = await cookies();
  const token = cookieStors.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  if (actionTypeState === "delete") {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`);

    if (res) {
      const userdata = await res.json();

      let cart = userdata.cart || [];

      const exiest = cart.some((item) => item.id === id);

      if (exiest) {
        cart = cart.filter((item) => item.id !== id);
      }
      await fetch(`http://localhost:1200/users/${decryption.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cart: cart }),
      });
      
    }
    revalidateTag("navbar");
  }
};
export default DeleteCart;
export const clearCart = async (prevstate, formData) => {
  const cookieStors = await cookies();
  const token = cookieStors.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  const actionTypeState = formData.get("intent");
  if (actionTypeState === "clear") {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
    const userdata = await res.json();
    let cart = userdata.cart || [];
    cart = [];
    await fetch(`http://localhost:1200/users/${decryption.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    revalidateTag("navbar")
  }
};
