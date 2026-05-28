"use server";

export default async function FeedbackAction(prevState, formData) {
  const intent = formData.get("feedbackation");
  const rating = Number(formData.get("ratimgNum"));
  const comment = formData.get("comment");
  console.log(rating);

  try {
    if (intent === "open_dropdown_action") {
      return {
        openstate: 200,
        openmessage: "All set! Give your feedback about",
      };
    }

    if (intent === "rating_update") {
      if (rating <= 6) {
        return { state: 201, message: "What could we do better on " };
      } else if (rating === 7 || rating === 8) {
        return {
          state: 202,
          message:
            "What are 2 things we could do to make you more excited about ",
        };
      } else if (rating === 9 || rating === 10) {
        return {
          state: 203,
          message: "What would you tell your friend or family about",
        };
      }
      return {};
    }

    if (intent === "feedback") {
      if (!comment) {
        return { state: 500, message: "Please write feedback about" };
      }

      await fetch(`http://localhost:1200/feedback`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      return {
        feedbackState: 204,
        timeStamp: Date.now(),
        FeedbackMessage: "Feedback sent!",
      };
    }
  } catch (error) {
    return { state: 500, message: "Server error" };
  }
}
