"use server";
export default async function EditProduct(prevstate, formdata) {
  const product = formdata.get("product");
  const NewProduct = JSON.parse(product); 
  try {
    const res = await fetch(`http://localhost:1200/products/${NewProduct.id}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  } catch {}
}
