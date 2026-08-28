"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./productStyle.module.css";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./serverFile";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { uploadImageToSupabase } from "@/utils/supabaseClient";

export default function SaveButton({ product }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const mainImageUrl = await uploadImageToSupabase(product.image_file);
      const hoverImageUrl = await uploadImageToSupabase(
        product.image_Hover_file,
      );
      const image3Url = await uploadImageToSupabase(product.image3_file);
      const image4Url = await uploadImageToSupabase(product.image4_file);
      const videoUrl = await uploadImageToSupabase(product.video_file);

      const finalProductData = {
        ...product,
        image: mainImageUrl || product.image,
        image_Hover: hoverImageUrl || product.image_Hover,
        image3: image3Url || product.image3,
        image4: image4Url || product.image4,
        video: videoUrl || product.video,
      };
      delete finalProductData.image_file;
      delete finalProductData.image_Hover_file;
      delete finalProductData.image3_file;
      delete finalProductData.image4_file;
      delete finalProductData.video_file;
      const formData = new FormData();
      Object.entries(finalProductData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      startTransition(async () => {
        const res = await EditProduct(null, formData);
        if (res?.success) {
          toast.success(res.message);
        } else {
          toast.error(res?.message || "Something Woring");
        }
      });
    } catch (error) {
      toast.error("An error occurred while uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = isUploading || isPending;

  return (
    <div className={styles.actionRow}>
      <button
        type="button"
        onClick={handleSave}
        className={styles.saveBtn}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill={"currentColor"}
            viewBox={"0 0 24 24"}
          >
            <path d="M13 7h-2V2h2v5M13 22h-2v-5h2v5M22 13h-5v-2h5v2M7 13H2v-2h5v2M16.24 9.17l-.7-.71-.71-.7 1.77-1.77 1.76-1.77.71.71.71.71-1.77 1.76zM5.64 19.78l-.71-.71-.71-.71 1.77-1.76 1.77-1.77.7.71.71.7-1.77 1.77zM18.36 19.78l-1.76-1.77-1.77-1.77.71-.7.7-.71 1.77 1.77 1.77 1.76-.71.71zM7.76 9.17 5.99 7.4 4.22 5.64l.71-.71.71-.71L7.4 5.99l1.77 1.77-.71.7z" />
          </svg>
        ) : (
          <>
            <FontAwesomeIcon icon={faSave} /> Save Product Changes
          </>
        )}
      </button>
    </div>
  );
}
