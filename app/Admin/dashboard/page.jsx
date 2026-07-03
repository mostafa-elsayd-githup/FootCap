import Dashboard from "./dashboard";
import { createClientForServer } from "@/utils/supabase";

async function getWishlist() {
  try {
    const supabaseServer = await createClientForServer();
    const { data: profile, profileError } = await supabaseServer
      .from("profiles")
      .select("*");
    if (profileError) {
      return [];
    }
    const totalOrdersCount = profile.reduce((acc, user) => {
      if (user.orders && Array.isArray(user.orders)) {
        return acc + user.orders.length;
      }
      return acc;
    }, 0);

    const totalRevenue = profile.reduce((acc, user) => {
      if (user.orders && Array.isArray(user.orders)) {
        const userSum = user.orders.reduce((sum, ord) => {
          return sum + (parseFloat(ord.totalprice) || 0);
        }, 0);
        return acc + userSum;
      }

      return acc;
    }, 0);

    const salesByDay = {};

    profile.forEach((user) => {
      if (user.orders && Array.isArray(user.orders)) {
        user.orders.forEach((ord) => {
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
      users: profile,
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
    <Dashboard
      total={totalRevenue}
      allUsers={users}
      orders={orders}
      finalData={finalData}
    />
  );
}

export default Product;
