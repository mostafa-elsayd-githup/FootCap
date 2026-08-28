import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useTransition } from "react";
import { HandleFeedbackAction } from "@/server/feedback_server";
import { toast } from "sonner";
export default function ActionButtons({ feedbackId }) {
  const [ispending, setTrasition] = useTransition();
  const handlefeedbackevents = (type, extraData = {}) => {
    setTrasition(async () => {
      const formData = new FormData();
      formData.append("actionType", type);
      formData.append("feedbackId", feedbackId);
      if (type === "reply" && extraData.replyText) {
        formData.append("replyText", extraData.replyText);
      } else if ((type === "delete", extraData.replyText)) {
      }
      const res = await HandleFeedbackAction(null, formData);
      if (res?.success) {
        toast.success(res.message || "Feedback deleted successfully", {
          position: "bottom-right",
          duration: 1500,
          style: {
            borderRadius: "14px",
            background: "var(--bg-card)",
            color: "var(--color-primary)",
            border: "1px solid var(--border-color)",
            fontSize: "13px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--bg-card)",
          },
        });
      } else {
        toast.error(res?.message || "Operation failed");
      }
    });
  };
  return (
    <div className="flex items-center gap-1.5">
      {/* <button
        onClick={() => handlefeedbackevents("repaly")}
        title="Reply"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-[var(--text-secondary)] bg-[var(--bg-sub)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)] transition-all duration-200 active:scale-95"
      >
        <FontAwesomeIcon icon={faReply} className="text-[11px]" />
        <span>Reply</span>
      </button>
      <button
        title="Share"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-[var(--text-secondary)] bg-[var(--bg-sub)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)] transition-all duration-200 active:scale-95"
      >
        <FontAwesomeIcon icon={faShareNodes} className="text-[11px]" />
        <span>Share</span>
      </button> */}
      <button
        onClick={() => handlefeedbackevents("delete")}
        title="Delete"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-95 ml-1 rounded-[10px]! overflow-hidden"
      >
        {ispending ? (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-[11px] animate-spin"
            />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
            <span>Delete</span>
          </>
        )}
      </button>
    </div>
  );
}
