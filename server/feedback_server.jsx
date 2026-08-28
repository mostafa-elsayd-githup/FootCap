"use server";

import { FeedbackSchame } from "@/schemas/feedbackusers_schema";
import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export async function HandleFeedbackAction(prevState, formData) {
  const dataObject = Object.fromEntries(formData);
  const resultSchame = FeedbackSchame.safeParse(dataObject);
  if (!resultSchame.success) {
    console.log(resultSchame.error.flatten());
    return { success: false, errors: resultSchame.error.flatten().fieldErrors };
  }
  const { actionType, feedbackId } = resultSchame.data;
  let supabaseServer = await createClientForServer();
  if (actionType === "delete") {
    const { error: errorMessage } = await supabaseServer
      .from("feedback")
      .delete()
      .eq("id", feedbackId);

    if (errorMessage) {
      console.error("Delete Error:", errorMessage.message);
      return { success: false, message: errorMessage.message };
    }
    revalidatePath("/admin/feedback");

    return { success: true, message: "Feedback deleted successfully" };
  }
  return { success: false, message: "Invalid action" };
}
