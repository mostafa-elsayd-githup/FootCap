export const dynamic = 'force-dynamic';
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

    const totalOrdersCount = profile?.reduce((acc, user) => {
      if (user.orders && Array.isArray(user?.orders)) {
        return acc + user.orders.length;
      }
      return acc;
    }, 0);

    const totalRevenue = profile?.reduce((acc, user) => {
      if (user.orders && Array.isArray(user.orders)) {
        const userSum = user?.orders?.reduce((sum, ord) => {
          return sum + (parseFloat(ord?.totalprice) || 0);
        }, 0);
        return acc + userSum;
      }

      return acc;
    }, 0);

    const salesByDay = {};

    profile?.forEach((user) => {
      if (user.orders && Array.isArray(user.orders)) {
        user?.orders?.forEach((ord) => {
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
    const categoryMap = {};

    profile?.forEach((user) => {
      if (Array.isArray(user?.orders)) {
        user.orders?.forEach((ord) => {      
          const items = ord.items || ord.cartItems || ord.products || [];
          if (Array.isArray(items)) {
            items?.forEach((product) => {
              const category =
                product?.product_type ||
                product?.category ||
                product?.type ||
                "Other";
              const quantity = Number(product.quantity) || 1;

              categoryMap[category] = (categoryMap[category] || 0) + quantity;
            });
          }
        });
      }
    });
    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

    const topCategoriesData = Object.entries(categoryMap)?.map(
      ([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
      }),
    );  
    return {
      users: profile,
      totalRevenue: totalRevenue,
      orders: totalOrdersCount,
      finalData: finalData,
      ProductsData: topCategoriesData,
    };
  } catch {
    return { users: [], totalRevenue: 0 };
  }
}

async function Product() {
  const { users, totalRevenue, orders, finalData , ProductsData} = await getWishlist();
  return (
    <Dashboard
      total={totalRevenue}
      allUsers={users}
      orders={orders}
      finalData={finalData}
      Donut_Char={ProductsData}
    />
  );
}

export default Product;
