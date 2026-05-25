"use client";
import React, { useActionState, useState, useRef, useEffect } from "react";
import styles from "./feedback.module.css";
import { useOpneing } from "../../RTK/storcontext";
import FeedbackAction from "./feedbackserver";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";

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
  const [feedbackation, setfeedbackaction] = useState("");

  const handleRatingSubmit = (num) => {
    setRating(num);
    setfeedbackaction("rating_update");

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }, 0);
  };

  const handleOpenMinidrop = () => {
    setIsOpenfeedback(!isOpenfeedback);
    setOpenminidrop("openminidrop");
    setfeedbackaction("open_dropdown_action");

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
      }, 800);
    }
  }, [setIsOpenfeedback, state?.FeedbackMessage, state.feedbackState, state.timeStamp]);

  return (
    <div
      className={`${styles.overlay} ${isOpenfeedback ? styles.activeOverlay : ""}`}
      onClick={() => setIsOpenfeedback(false)} // تغلق القائمة عند الضغط على الـ Backdrop الشفاف بالخارج
    >
      <div 
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()} // منع إغلاق المودال عند الضغط بداخله
      >
        <button
          type="button"
          className={styles.opneButton}
          onClick={handleOpenMinidrop}
        >
          FEEDBACK
        </button>

        <div className={styles.logoArea}>
          <Card.Img src={"/logo.svg"} alt="Logo" />
        </div>

        {pending ? (
          <div className={styles.overlaylouder}>
            <div className={styles.halfCircleLoader}></div>
          </div>
        ) : (
          <form
            action={formAction}
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
                How likely are you to recommend <strong>our-site.com</strong> to a friend? *
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
                      name="rating"
                      value={num}
                      checked={rating === num}
                      className={styles.radioInput}
                      onChange={() => handleRatingSubmit(num)}
                    />
                 
                    <label htmlFor={`rating-${num}`} className={styles.ratingLabel}>
                      {num}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <input type="hidden" name="ratimgNum" value={rating || ""} />
            <input
              type="hidden"
              name="feedbackation"
              value={feedbackation || ""}
            />
            <input
              type="hidden"
              name="isOpenminidrop"
              value={isOpenminidrop || ""}
            />
            {(state.state === 201 || state.state === 202 || state.state === 203) && (
              <div className={styles.feedbackSection}>
                <p className={styles.questionText}>
                  {state?.message} <strong>FOOTCAP.com</strong>
                </p>
                <textarea
                  name="comment"
                  className={styles.textareaField}
                  placeholder="Tell it like it is..."
                  required
                />
              </div>
            )}

            <button
              className={styles.nextButton}
              type="submit"
              onClick={() => setfeedbackaction("feedback")}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}