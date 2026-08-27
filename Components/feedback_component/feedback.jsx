"use client";
import { useActionState, useState, useRef, useEffect } from "react";
import styles from "./feedback.module.css";
import { useOpneing } from "@/RTK/storcontext";
import FeedbackAction from "@/server/feedbackmessages_server";
import Swal from "sweetalert2";
import MostoreLogo from "../my_logo/logo";
import { usePathname } from "next/navigation";

export default function Feedback() {
  const formRef = useRef(null);
  const [rating, setRating] = useState(null);
  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const initialSate = { state: null, message: "" };
  const [state, formAction, pending] = useActionState(
    FeedbackAction,
    initialSate,
  );

  const { isOpenfeedback, setIsOpenfeedback } = useOpneing();
  const [isOpenminidrop, setOpenminidrop] = useState("");
  const [feedbackaction, setFeedbackaction] = useState("");

  const handleRatingSubmit = (num) => {
    setRating(num);
    setFeedbackaction("rating_update");

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }, 0);
  };

  const handleOpenMinidrop = () => {
    setIsOpenfeedback(!isOpenfeedback);
    setOpenminidrop("openminidrop");
    setFeedbackaction("open_dropdown_action");

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }, 0);
  };

  useEffect(() => {
    if (state?.feedbackState !== undefined && state?.feedbackState !== null) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: state.feedbackState && state?.FeedbackMessage,
      });
      setTimeout(() => {
        setIsOpenfeedback(false);
        setRating(false)
      }, 800);
    }
  }, [
    setIsOpenfeedback,
    state?.FeedbackMessage,
    state?.feedbackState,
    state?.timeStamp,
  ]);
  const path = usePathname();
  const exsist = path.startsWith("/Admin");
  if (exsist) {
    return null;
  }
  return (
    <div
      className={`${styles.overlay} ${isOpenfeedback ? styles.activeOverlay : ""}`}
      onClick={() => setIsOpenfeedback(false)}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.opneButton}
          onClick={handleOpenMinidrop}
        >
          FEEDBACK
        </button>

        <div className={styles.logoArea}>
          <MostoreLogo className={styles.logoArea} />
        </div>

        {pending ? (
          <div className={styles.overlaylouder}>
            <div className={styles.halfCircleLoader}></div>
          </div>
        ) : (
          <form
            action={formAction}
            onClick={(e) => e.stopPropagation()}
            ref={formRef}
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <h2 className={styles.title}>Your Experience</h2>
            <h3 className={styles.text}>
              Don’t hold back. Good or bad -{" "}
              <span className={styles.minitext}>tell it like it is.</span>
            </h3>

            <div>
              <p className={styles.questionText}>
                How likely are you to recommend{" "}
                <strong>
                  Mo
                  <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                    store
                  </span>
                </strong>{" "}
                to a friend? *
              </p>
              <div className={styles.questionSection}>
                <span>Very unlikely</span> <span>Very likely</span>
              </div>

              <div className={styles.ratingContainer}>
                {ratings.map((num) => (
                  <div key={num} className={styles.ratingOption}>
                    <input
                      type="radio"
                      id={`rating-${num}`}
                      value={num}
                      checked={rating === num}
                      className={styles.radioInput}
                      onChange={() => handleRatingSubmit(num)}
                    />

                    <label
                      htmlFor={`rating-${num}`}
                      className={styles.ratingLabel}
                    >
                      {num}
                    </label>
                  </div>
                ))}
              </div>
              {state?.state === 400 && (
                <span className="text-red-600">{state.message}</span>
              )}
            </div>
            <input type="hidden" name="rating" value={rating ?? ""} />
            <input type="hidden" name="intent" value={feedbackaction || ""} />
            <input
              type="hidden"
              name="isOpenminidrop"
              value={isOpenminidrop || ""}
            />

            {(state?.state === 201 ||
              state?.state === 202 ||
              state?.state === 203) && (
              <div className={styles.feedbackSection}>
                <p className={styles.questionText}>
                  {state?.message}{" "}
                  <strong>
                    Mo
                    <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                      store
                    </span>
                    .com
                  </strong>
                </p>
                <textarea
                  name="comment"
                  className={styles.textareaField}
                  placeholder="Tell it like it is..."
                />
              </div>
            )}

            <button
              className={styles.nextButton}
              type="submit"
              onClick={() => setFeedbackaction("feedback")}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
