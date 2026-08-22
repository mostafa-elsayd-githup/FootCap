import { createClientForServer } from "@/utils/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCommentDots,
  faUserCircle,
  faThumbsUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./feedback.module.css";

export default async function Feedback() {
  const supabase = await createClientForServer();

  const { data: feedbacks, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center  ${styles.container}`}
      >
        <p className="text-red-500 font-medium">
          An error occurred while loading opinions
        </p>
      </div>
    );
  }

  const totalReviews = feedbacks?.length || 0;
  const avgRating = totalReviews
    ? (
        feedbacks.reduce((acc, item) => acc + (item.rating || 5), 0) /
        totalReviews
      ).toFixed(1)
    : 0;

  return (
    <div className={`min-h-screen p-4 md:p-8 font-sans  ${styles.container}`}>
      <div className="space-y-8">
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 ${styles.headerBorder}`}
        >
          <div>
            <h1
              className={`text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 ${styles.title}`}
            >
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-amber-400 text-xl"
              />
              Customer reviews
            </h1>
            <p className={`text-sm mt-1 ${styles.subtitle}`}>
              Monitoring messages and feedback sent by store users
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs self-start md:self-auto ${styles.badge}`}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>View all({totalReviews})</span>
          </div>
        </div>
        <div className={styles.box}>
          <div className="grid grid-cols-1 min-[997px]:grid-cols-3 gap-4 mb-4 border-b border-[var(--border-color)] pb-4">
            <div
              className={`rounded-2xl p-5 flex items-center justify-between ${styles.subCard}`}
            >
              <div>
                <p className={`font-bold text-2xl ${styles.subtitle}`}>
                  Total opinions
                </p>
                <h3 className={`text-2xl font-bold mt-1 ${styles.title}`}>
                  {totalReviews}
                </h3>
              </div>
              <div
                className={`w-10 text-3xl h-10 rounded-xl flex items-center justify-center ${styles.iconBox}`}
              >
                <FontAwesomeIcon icon={faCommentDots} />
              </div>
            </div>

            <div
              className={`rounded-2xl p-5 flex items-center justify-between ${styles.subCard}`}
            >
              <div>
                <p className={` font-bold text-2xl ${styles.subtitle}`}>
                  Average rating
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className={`text-2xl font-bold ${styles.title}`}>
                    {avgRating}
                  </h3>
                  <span className="text-xs text-amber-500">/ 5.0</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>

            <div
              className={`rounded-2xl p-5 flex items-center justify-between ${styles.subCard}`}
            >
              <div>
                <p className={`font-bold text-2xl ${styles.subtitle}`}>
                  Satisfaction rate
                </p>
                <h3 className="text-2xl font-bold text-emerald-500 mt-1">
                  {totalReviews
                    ? `${Math.round((avgRating / 5) * 100)}%`
                    : "0%"}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <FontAwesomeIcon icon={faThumbsUp} />
              </div>
            </div>
          </div>

          {feedbacks && feedbacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {feedbacks.map((item) => (
                <div
                key={item.id}
                className={`rounded-2xl p-6 flex flex-col justify-between shadow-sm p-2 ${styles.card}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.iconBox}`}
                        >
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            className="text-lg"
                          />
                        </div>
                        <div>
                          <h4
                            className={`text-sm font-semibold leading-tight ${styles.title}`}
                          >
                            {item.fullname || item.full_name || "Guest"}
                          </h4>
                          <p
                            className={`text-xs mt-0.5 dir-ltr text-right ${styles.subtitle}`}
                          >
                            {item.email || "No email address"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
                        <span>{item.rating || 5}</span>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-[10px]"
                        />
                      </div>
                    </div>

                    <p
                      className={`text-sm leading-relaxed mb-6 font-normal ${styles.commentText}`}
                    >
                      {item.message}
                    </p>
                  </div>

                  <div
                    className={`pt-4 flex items-center justify-between text-xs ${styles.footerBorder}`}
                  >
                    <span>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "undefined"}
                    </span>
                    <span
                      className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md ${styles.badge}`}
                    >
                      MOstore Verified
                    </span>
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
        </div>
      </div>
    </div>
  );
}
