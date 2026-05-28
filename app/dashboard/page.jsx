"use server";
import Dashboard from "./dashboard";
import NavAction from "@/Components/Navbar/NavAction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getWishlist() {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  // const decryption = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const res = await fetch(`http://localhost:1200/users`, {
      cache: "no-store",
      next: { tags: ["navbar"] },
    });

    let usersData = await res.json();
    const totalOrdersCount = usersData.reduce((acc, user) => {
      if (user.order && Array.isArray(user.order)) {
        return acc + user.order.length;
      }
      return acc;
    }, 0);

    const totalRevenue = usersData.reduce((acc, user) => {
      if (user.order && Array.isArray(user.order)) {
        const userSum = user.order.reduce((sum, ord) => {
          return sum + (parseFloat(ord.totalprice) || 0);
        }, 0);
        return acc + userSum;
      }
      return acc;
    }, 0);
    const salesByDay = {};

    usersData.forEach((user) => {
      if (user.order && Array.isArray(user.order)) {
        user.order.forEach((ord) => {
          const day = new Date(ord.createdAt).toLocaleDateString("en-us", {
            weekday: "short",
          });

          const price = parseFloat(ord.totalprice) || 0;

          if (salesByDay[day]) {
            salesByDay[day] += price;
          } else {
            salesByDay[day] = price;
          }
        });
      }
    });
    const daysOrder = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    const finalData = daysOrder.map((day) => ({
      name: day,
      sales: salesByDay[day] || 0,
    }));
    return {
      users: usersData,
      totalRevenue: totalRevenue,
      orders: totalOrdersCount,
      finalData: finalData,
    };
  } catch {
    return { users: [], totalRevenue: 0 };
  }
}

async function Product() {
  const { users, totalRevenue, orders, finalData } = await getWishlist();

  return (
    <>
      <NavAction />
        <Dashboard
          total={totalRevenue}
          allUsers={users}
          orders={orders}
          finalData={finalData}
          />
    </>
  );
}

export default Product;
