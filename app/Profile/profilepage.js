"use client";
import styles from "./profile.module.css";
import { useState } from "react";
import logoutfun from "./actionFile";
import { useActionState } from "react";

function ProfilePage({ users, User_statistics }) {
  const date = new Date(users.createdAt).toLocaleDateString("eg-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [buttontype, setbuttontype] = useState("");
  const initialstate = { messgae: "", state: null };
  const [state, formAction, pending] = useActionState(logoutfun, initialstate);

  return (
    <>
      <div className={styles.profileWrapper}>
        {/* loader */}
        {pending && (
          <div className={styles.overlay}>
            <div className={styles.halfCircleLoader}></div>
          </div>
        )}
        <div class="container py-5">
          <div class="row justify-content-center">
            <div class="col-md-4 mb-4">
              <div class={`card ${styles.sideCard}`}>
                <div class={`card-body text-center ${styles.card_body}`}>
                  <form action={formAction} onClick={(e) => e.preventDefault}>
                    <div class={styles.avatarWrapper}>
                      <i class={`fa-solid fa-users ${styles.avatarIcon}`}></i>     
                    </div>
                    <h4 class="fw-bold mt-3">{users.name}</h4>

                    <input type="hidden" name="buttontype" value={buttontype} />
                    <input type="hidden" name="id" value={users.id} />
                    <input type="hidden" name="name" value={users.name} />
                    <input
                      type="hidden"
                      name="joinDate"
                      value={users.joinDate}
                    />
                    <input type="hidden" name="email" value={users.email} />
                    <div class="d-grid gap-2">
                      <button
                        onMouseDown={() => setbuttontype("edit")}
                        class={`btn btn-outline-dark btn-sm ${styles.editbut}`}
                      >
                        <i class="fa-solid fa-pen-to-square me-2"></i> Edit
                        Profile
                      </button>
                      <button
                        class="btn btn-danger btn-sm opacity-75"
                        onMouseDown={() => setbuttontype("logout")}
                      >
                        <i class="fa-solid fa-right-from-bracket me-2"></i>{" "}
                        Logout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class={`card ${styles.mainCard}`}>
                <div class="card-header py-3">
                  <h5 class="mb-0 fw-bold">Account Information</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class={`list-group-item py-3 ${styles.inputs}`}>
                    <div class="row">
                      <div class="col-4 ">Full Name</div>
                      <div class="col-8 fw-semibold">{users.name}</div>
                    </div>
                  </li>
                  <li class={`list-group-item py-3 ${styles.inputs}`}>
                    <div class="row">
                      <div class="col-4 ">Email Address</div>
                      <div class="col-8 fw-semibold">{users.email}</div>
                    </div>
                  </li>
                  <li class={`list-group-item py-3 ${styles.inputs}`}>
                    <div class="row">
                      <div class="col-4 ">Joined</div>
                      <div class="col-8 fw-semibold">{date}</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="row mt-4">
                <div class="col-sm-6 mb-3">
                  <div class={`card h-100 ${styles.statCard}`}>
                    <div
                      class={`card-body d-flex align-items-center ${styles.Buttons}`}
                    >
                      <div class={styles.statIconBox}>
                        <i class="fa-solid fa-bag-shopping"></i>
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0">Orders</h6>
                        <span class="fw-bold h5">{User_statistics.order?.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 mb-3">
                  <div class={`card h-100 ${styles.statCard}`}>
                    <div
                      class={`card-body d-flex align-items-center ${styles.Buttons}`}
                    >
                      <div class={`${styles.statIconBox} ${styles.heartIcon}`}>
                        <i class="fa-solid fa-heart"></i>
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0 ">Wishlist</h6>
                        <span class="fw-bold h5">
<<<<<<< HEAD
                          {User_statistics.wishlist?.length}
=======
                          {User_statistics?.length}
>>>>>>> c9dbbef083a510ff9ff89ee2a4d06dedd27d3460
                        </span>
                      </div>
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
