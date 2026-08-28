"use server";

import { feedbackschema } from "@/schemas/feedbackschema";
import { createClientForServer } from "@/utils/supabase";

export default async function FeedbackAction(prevState, formData) {
  const dataObject = Object.fromEntries(formData);
  const feedbackResult = feedbackschema.safeParse(dataObject);
  const supabaseServer = await createClientForServer();

  if (!feedbackResult.success) {
    return { state: 400, message: "invalid data" };
  }

  const { rating, intent, comment } = feedbackResult.data;

  try {
    if (intent === "open_dropdown_action") {
      return {
        openstate: 200,
        openmessage: "All set! Give your feedback about",
      };
    }
    if (intent === "feedback") {
      if (!comment || comment.trim().length === 0) {
        return { state: 400, message: "Please write a comment" };
      }

      const {
        data: { user },
      } = await supabaseServer.auth.getUser();

      let profileData = null;

      if (user) {
        const { data, error: userError } = await supabaseServer
          .from("profiles")
          .select("id, email, full_name")
          .eq("id", user.id)
          .maybeSingle();

        if (!userError) {
          profileData = data;
        }
      }

      const payload = {
        rating: rating ? Number(rating) : null,
        message: comment.trim(),
        ...(user && {
          user_id: user.id,

          email: profileData?.email || user.email || null,
          full_name:
            profileData?.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            null,
        }),
      };

      const { error } = await supabaseServer.from("feedback").insert([payload]);

      if (error) {
        console.error("Supabase error:", error);
        return { state: 500, message: "Failed to save feedback" };
      }

      return {
        feedbackState: 204,
        timeStamp: Date.now(),
        FeedbackMessage: "Feedback sent!",
      };
    }
    if (rating !== undefined && rating !== null && rating !== "") {
      const numericRating = Number(rating);

      if (numericRating <= 6) {
        return { state: 201, message: "What could we do better on " };
      } else if (numericRating === 7 || numericRating === 8) {
        return {
          state: 202,
          message:
            "What are 2 things we could do to make you more excited about ",
        };
      } else if (numericRating === 9 || numericRating === 10) {
        return {
          state: 203,
          message: "What would you tell your friend or family about",
        };
      }
    }

    return { state: 400, message: "No valid action" };
  } catch (error) {
    return { state: 500, message: "Server error" };
  }
}