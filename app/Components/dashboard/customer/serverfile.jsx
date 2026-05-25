"use server";
import { revalidateTag } from "next/cache";

export default async function HandleAtion(prevend, formData) {
  const search = formData.get("textvalue");
  const message = formData.get("message");
  const block = formData.get("block");
  const inputdialog = formData.get("inputdialog");
  console.log(block);

  try {
    if (search) {
      const user = await fetch(`http://localhost:1200/users`);
      if (user.ok) {
        const userData = await user.json();

        const filteruser = userData.filter((user) => {
          if (user.name.includes(search)) {
            return user;
          } else if (user.email.includes(search)) {
            return user;
          }
        });
        return filteruser;
      } else {
        return [];
      }
    } else if (block) {
      if (block && !inputdialog) {
        return { blockState: true, timeStamp: Date.now() };
      }
      if (inputdialog === "yes") {
        const user = await fetch(`http://localhost:1200/users/${block}`);
        if (user.ok) {
          let userdata = await user.json();
          await fetch(`http://localhost:1200/blocked`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(userdata),
          });
          const deleteUser = await fetch(`http://localhost:1200/users`);
          if (deleteUser.ok) {
            await fetch(`http://localhost:1200/users/${block}`, {
              cache: "no-cache",
              method: "DELETE",
            });
            revalidateTag("cuctomerPage");
            revalidateTag("usersBlock");
            return { blockState: false };
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
