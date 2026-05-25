"use server";

import { revalidateTag } from "next/cache";

export default async function UnblockUsers(prevstate, formData) {
  const BlockBut = formData.get("BlockBut");
  const inputdialog = formData.get("inputdialog");

  try {
    if (BlockBut && !inputdialog) {
      return { blockState: true, timeStamp: Date.now() };
    }
    if (inputdialog === "yes") {

      const fineduser = await fetch(
        `http://localhost:1200/blocked/${BlockBut}`,
        {
          cache: "no-store",
        },
      );
      const user = await fineduser.json();
      await fetch(`http://localhost:1200/users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      await fetch(`http://localhost:1200/blocked/${BlockBut}`, {
        method: "DELETE",
      });
      revalidateTag("usersBlock");
      revalidateTag("cuctomerPage");
      return { blockState: false };
    }
  } catch (error) {
    console.error(error);
  }
}
