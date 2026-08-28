import { z } from "zod";
export const FeedbackSchame = z.object({
  actionType: z.enum(["delete"]),
  feedbackId: z.string().min(1, "Feedback ID is required"),
});
