"use client";
import { createBrowserClient } from "@supabase/ssr";

export async function uploadImageToSupabase(file) {
  if (!file || typeof file === "string") return file;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    const fileExtension = file.name.split('.').pop();
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, "") 
      .replace(/[^a-zA-Z0-9]/g, "_"); 

    const fileName = `${Date.now()}_${cleanFileName}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading to Supabase:", error.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}