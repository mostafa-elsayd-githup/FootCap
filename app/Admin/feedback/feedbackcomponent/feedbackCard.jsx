"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCommentDots,
  faUser,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "./feedbackbutton";
import styles from "../feedback.module.css";

export default function FeedbackCard({ feedbacks }) {
  return (
    <>
      {feedbacks && feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-5 relative flex flex-col justify-between shadow-sm border transition-all duration-300 hover:shadow-md ${styles.card}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${styles.iconBox}`}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-sm opacity-80"
                      />
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold tracking-tight ${styles.title}`}
                      >
                        {item.full_name || "Guest"}
                      </h4>
                      <p
                        className={`text-xs dir-ltr text-right opacity-70 ${styles.subtitle}`}
                      >
                        {item.email || "No email address"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-500/10  border-amber-500/20 px-2.5 p-2 rounded-full">
                    <span>{item.rating || 5}</span>
                    <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed mb-6 font-normal ${styles.commentText}`}
                >
                  {item.message}
                </p>
              </div>
              <div
                className={`pt-4 border-t flex flex-col gap-3 ${styles.footerBorder}`}
              >
                <div className="flex items-center justify-between text-[11px] opacity-75">
                  <span>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "غير محدد"}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full font-medium ${styles.badge}`}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-[9px] text-emerald-500"
                    />
                    MOstore Verified
                  </span>
                </div>
                <div className="flex items-center justify-end pt-1">
                  <ActionButtons feedbackId={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`border border-dashed rounded-3xl p-12 text-center ${styles.subCard}`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${styles.iconBox}`}
          >
            <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
          </div>
          <h3 className={`text-lg font-semibold ${styles.title}`}>
            There are no messages currently
          </h3>
          <p className={`text-sm mt-1 max-w-sm mx-auto ${styles.subtitle}`}>
            No user has submitted feedback or ratings yet
          </p>
        </div>
      )}
    </>
  );
}
