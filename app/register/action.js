"use server";
import { redirect } from "next/navigation";

export async function registerAction(prevstate, formData) {
  const name = formData.get("name");
  const email = formData.get("email") || "";
  const password = formData.get("password");

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //  <=Regex (chick email include a @ and two or three chr.. (.com or .org or .io ))

  if (!name) return { message: "من فضلك أدخل الاسم" };
  if (!email || email.length < 8) {
    return {
      message: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا و لا يقل عن 8 أحرف.",
    };
  }
  if (!emailRegex.test(email)) {
    return {
      message: "البريد الإلكتروني غير صحيحة",
    };
  }
  if (!password && password.length < 8) {
    return { message: "ادخل كلمه مرور قويه" };
  }
  try {
    const response = await fetch(`http://localhost:1200/users?email=${email}`);
    if (response.ok) {
      const users = await response.json();
      if (users.length > 0) {
        return {
          message:
            "يوجد حساب مرتبط بهذا البريد الإلكتروني. حاول تسجيل الدخول أو استخدم بريدًا آخر.",
        };
      }
    }
    await fetch(`http://localhost:1200/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return { message: "عذراً، حدث خطأ فني" };
  }
  redirect("/login");
}
