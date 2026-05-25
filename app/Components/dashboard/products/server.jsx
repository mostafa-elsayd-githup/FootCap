"use server";

import { revalidateTag } from "next/cache";

export default async function ProductSHandle(prvstate, formData) {
  const buttontype = formData.get("button");
  const productId = formData.get("productId");
  const productType = formData.get("productType");
  const Running = `http://localhost:1200/your_sport_start_hear_running`;
  const Training = `http://localhost:1200/products`;
  const FootBall = `http://localhost:1200/your_sport_start_hear_Football`;
  const Gym = `http://localhost:1200/your_sport_start_hear_gym`;
  const Tennis = `http://localhost:1200/your_sport_start_hear_tennis`;
  const BasketBall = `http://localhost:1200/your_sport_start_hear_backitball`;
  const Jackets = `http://localhost:1200/WHAT'S_HOT_Jacket`;
  const Terrex = `http://localhost:1200/WHAT'S_HOT_terrex`;
  const Simpson = `http://localhost:1200/WHAT'S_HOT_simpsons`;
  const ProductsDeleted = `http://localhost:1200/products_Deleted`;
  try {
    if (productType === "Running") {
      if (buttontype === "Delete") {
        const res = await fetch(`${Running}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Running}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("RunningProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "Training") {
      if (buttontype === "Delete") {
        const res = await fetch(`${Training}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Training}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("TrainingProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "FootBall") {
       if (buttontype === "Delete") {
        const res = await fetch(`${FootBall}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();

          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${FootBall}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("FootBallProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "Gym") {
      if (buttontype === "Delete") {
        const res = await fetch(`${Gym}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Gym}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("GymProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "Tennis") {
         if (buttontype === "Delete") {
        const res = await fetch(`${Tennis}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
       
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Tennis}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("TennisProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "BasketBall") {
        if (buttontype === "Delete") {
        const res = await fetch(`${BasketBall}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${BasketBall}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("BasketBallProduct");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "Jackets") {
          if (buttontype === "Delete") {
        const res = await fetch(`${Jackets}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Jackets}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("JacketsProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "Terrex") {
        if (buttontype === "Delete") {
        const res = await fetch(`${Terrex}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
       
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Terrex}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("TerrexProducts");
        }
      } else if (buttontype === "Edit") {
      }
    } else if (productType === "Simpson") {
       if (buttontype === "Delete") {
        const res = await fetch(`${Simpson}/${productId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          await fetch(`${ProductsDeleted}`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ SectionType: productType, data }),
          });
          await fetch(`${Simpson}/${productId}`, {
            cache: "no-store",
            method: "Delete",
          });
          revalidateTag("SimpsonProducts");
        }
      } else if (buttontype === "Edit") {
      }
    }
  } catch {}
}
