"use client";
import styles from "./profile.module.css";
import { useState } from "react";
import logoutfun from "@/server/profile_server";
import { useActionState } from "react";
import Loader from "@/Components/loaderFecthing/loader";

function ProfilePage({ users }) {
  const date = new Date(users?.created_at).toLocaleDateString("eg-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [buttontype, setbuttontype] = useState("");
  const initialstate = { message: "", state: null };
  const [state, formAction, pending] = useActionState(logoutfun, initialstate);

  return (
    <>
      <div className={styles.profileWrapper}>
        {pending && <Loader />}

        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-5">
              <div className={styles.sideCard}>
                <div className={styles.card_body}>
                  <form action={formAction} onClick={(e) => e.preventDefault}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.avatarWrapper}>
                        <i
                          className={`fa-solid fa-user ${styles.avatarIcon}`}
                        ></i>
                      </div>
                      <div className={styles.onlineBadge}></div>
                    </div>

                    <h3 className={styles.userName}>{users.full_name}</h3>
                    <p className={styles.userRole}>Premium Member</p>

                    <input type="hidden" name="buttontype" value={buttontype} />
                    <input type="hidden" name="id" value={users.id} />
                    <input type="hidden" name="name" value={users.name} />
                    <input
                      type="hidden"
                      name="joinDate"
                      value={users.joinDate}
                    />
                    <input type="hidden" name="email" value={users.email} />

                    <div className={styles.actionButtons}>
                      <button
                        onMouseDown={() => setbuttontype("edit")}
                        className={styles.editbut}
                      >
                        <i className="fa-solid fa-pen-to-square me-2"></i> Edit
                        Profile
                      </button>

                      <button
                        className={styles.logoutbut}
                        onMouseDown={() => setbuttontype("logout")}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>{" "}
                        Logout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className={styles.mainContentLayout}>
                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className={styles.statCard}>
                      <div className={styles.statIconBox}>
                        <i className="fa-solid fa-bag-shopping"></i>
                      </div>
                      <div className="ms-3">
                        <span className={styles.statLabel}>Total Orders</span>
                        <h4 className={styles.statValue}>
                          {users.order?.length || 0}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className={styles.statCard}>
                      <div
                        className={`${styles.statIconBox} ${styles.heartIcon}`}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </div>
                      <div className="ms-3">
                        <span className={styles.statLabel}>Saved Items</span>
                        <h4 className={styles.statValue}>
                          {users.wishlist?.length || 0}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mainCard}>
                  <div className={styles.cardHeaderCustom}>
                    <h5 className="mb-0 fw-bold">Account Information</h5>
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>

                  <div className={styles.infoList}>
                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Full Name</div>
                      <div className={styles.infoValue}>{users.full_name}</div>
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Email Address</div>
                      <div className={styles.infoValue}>{users.email}</div>
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Joined Since</div>
                      <div className={styles.infoValue}>{date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
