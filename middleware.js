import { NextResponse } from 'next/server'

export function middleware(request) {
  // الحصول على المسار اللي المستخدم بيحاول يوصل له حالاً
const { pathname, searchParams } = request.nextUrl;

// 1. نتأكد الأول إننا في الصفحة الصح
  if (pathname.includes("shrat_clube_pages")) {
    
    // 2. نجيب قيمة الـ club من الرابط
    const club = searchParams.get('club');

    if (club === "Man United") {
      console.log("المستخدم يشجع الشياطين الحمر 🔴 (Man United)");
    } 
    else if (club === "Liverpool") {
      console.log("المستخدم يشجع الريدز 🔴 (Liverpool)");
    }
  }
  // إخبار Next.js بأن يسمح للمستخدم بالوصول للصفحة
  return NextResponse.next();
}