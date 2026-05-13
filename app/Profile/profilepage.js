"use client";
import styles from "./profile.module.css";
import { useState } from "react";
import logoutfun from "./actionFile";
import { useActionState } from "react";

function ProfilePage({ users }) {
  const date = new Date(users?.createdAt).toLocaleDateString("eg-EG", {
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
         <div className="container py-5">
           <div className="row justify-content-center">
             <div className="col-md-4 mb-4">
              <div className={`card ${styles.sideCard}`}>
                <div className={`card-body text-center ${styles.card_body}`}>
                  <form action={formAction} onClick={(e) => e.preventDefault}>
                    <div className={styles.avatarWrapper}>
                      <i className={`fa-solid fa-user ${styles.avatarIcon}`}></i>
                    </div>
                    <h4 className="fw-bold mt-3">{users.name}</h4>

                    <input type="hidden" name="buttontype" value={buttontype} />
                    <input type="hidden" name="id" value={users.id} />
                    <input type="hidden" name="name" value={users.name} />
                    <input
                      type="hidden"
                      name="joinDate"
                      value={users.joinDate}
                    />
                    <input type="hidden" name="email" value={users.email} />
                    <div className="d-grid gap-2">
                      <button
                        onMouseDown={() => setbuttontype("edit")}
                        className={`btn btn-outline-dark btn-sm ${styles.editbut}`}
                      >
                        <i className="fa-solid fa-pen-to-square me-2"></i> Edit
                        Profile
                      </button>
                      <button
                        className="btn btn-danger btn-sm opacity-75"
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

             <div className="col-md-8">
              <div className={`card ${styles.mainCard}`}>
                 <div className="card-header py-3">
                 <h5 className="mb-0 fw-bold">Account Information</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item py-3 ${styles.inputs}`}>
                     <div className="row">
                       <div className="col-4 ">Full Name</div>
                       <div className="col-8 fw-semibold">{users.name}</div>
                    </div>
                  </li>
                  <li className={`list-group-item py-3 ${styles.inputs}`}>
                     <div className="row">
                       <div className="col-4 ">Email Address</div>
                       <div className="col-8 fw-semibold">{users.email}</div>
                    </div>
                  </li>
                  <li className={`list-group-item py-3 ${styles.inputs}`}>
                     <div className="row">
                       <div className="col-4 ">Joined</div>
                       <div className="col-8 fw-semibold">{date}</div>
                    </div>
                  </li>
                </ul>
              </div>

               <div className="row mt-4">
                 <div className="col-sm-6 mb-3">
                  <div className={`card h-100 ${styles.statCard}`}>
                    <div
                      className={`card-body d-flex align-items-center ${styles.Buttons}`}
                    >
                      <div className={styles.statIconBox}>
                        <i  className="fa-solid fa-bag-shopping"></i>
                      </div>
                       <div className="ms-3">
                        <h6  className="mb-0">Orders</h6>
                        <span className="fw-bold h5">
                          {users.order?.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                 <div className="col-sm-6 mb-3">
                  <div className={`card h-100 ${styles.statCard}`}>
                    <div
                      className={`card-body d-flex align-items-center ${styles.Buttons}`}
                    >
                      <div className={`${styles.statIconBox} ${styles.heartIcon}`}>
                        <i  className="fa-solid fa-heart"></i>
                      </div>
                       <div className="ms-3">
                        <h6  className="mb-0 ">Wishlist</h6>
                        <span className="fw-bold h5">
                          {/* {User_statistics.wishlist?.length} */}

                          {users.wishlist?.length}
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
