"use client";
import React, { useActionState } from "react";
import styles from "./customer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEye,
  faEnvelope,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import HandleAtion from "@/server/customer_server";
import Loader from "@/Components/loaderFecthing/loader";
import Swal from "sweetalert2";
export default function AdminCustomers({ users }) {
  const [UnblockMessage, setUnblocMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [message, setmessage] = useState(false);
  const [block, setblock] = useState(false);
  const [isopen, setisopen] = useState("");
  const initialstate = { users: [], foundState: null, message: "", time: null };
  const [state, formAction, pending] = useActionState(
    HandleAtion,
    initialstate,
  );
  // const x = 401;
  // if (x === 401) {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: "bottom-right",
  //     showConfirmButton: false,
  //     timer: 1000000,
  //     timerProgressBar: true,
  //     color: "var(--color-primary)",
  //     background: "var(--bg-card)",
  //   });
  //   Toast.fire({
  //     icon: "warning",
  //     title: "state.message",
  //   });
  // }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);
  const displayUsers = state.users?.length > 0 ? state.users : users;
  useEffect(() => {
    if (state.foundState === 401) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        color: "var(--color-primary)",
        background: "var(--bg-card)",
      });
      Toast.fire({
        icon: "warning",
        title: state.message,
      });
    }
  }, [state.foundState, state.message, state.time]);
  const handleblock = async (e) => {
    setblock(e);
  };
  return (
    <div className={styles.adminLayout}>
      {/* loader */}
      {pending && <Loader />}
      <div className={styles.content}>
        <form action={formAction}>
          <div
            className={
              isopen ? styles.dialogbackground : styles.dialogbackgroundNone
            }
            onClick={() => setisopen(false)}
          >
            <div className={styles.modalCard}>
              <summary className={styles.modalSummary}>
                Are You Sure To Lift The Ban?
              </summary>
              <div className={styles.btnGroup}>
                <button
                  type="submit"
                  onClick={() => handleblock}
                  className={styles.confirmBtn}
                >
                  block
                </button>
                <button
                  type="button"
                  onClick={() => setisopen(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <input
                  type="hidden"
                  name="inputdialog"
                  value={UnblockMessage}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 ">
            <div>
              <h1
                className="text-3xl font-black italic uppercase"
                style={{ color: "var(--color-primary)" }}
              >
                Customer Base
              </h1>
              <p className="text-gray-500 text-sm">
                Managing and analyzing data of registered customers
              </p>
            </div>
            <div className={styles.input_container}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  name="textvalue"
                  placeholder="Search by name or email..."
                  className={styles.searchInput}
                  onSubmit={(e) => {
                    e.target.value;
                  }}
                  required
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className={styles.searchIcon}
                />
              </div>
            </div>
          </div>
          <div>
            <table className={styles.customerTable}>
              <thead className="text-center">
                <tr>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Orders</th>
                  <th className="text-left">Total Spent</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers?.map((user) => {
                  const price = user.orders?.reduce((acc, item) => {
                    return acc + (parseFloat(item.totalprice) || 0);
                  }, 0);
                  const total = isClient
                    ? new Intl.NumberFormat("en", {
                        notation: "compact",
                        style: "currency",
                        currency: "EGP",
                      }).format(price)
                    : "";
                  return (
                    <tr key={user.id} className={styles.tableRow}>
                      <td
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <div className={styles.avatar}>
                          {user.full_name[0].toUpperCase()}
                        </div>
                        <div className="font-bold">{user.full_name}</div>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status === "Active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          active
                        </span>
                      </td>
                      <td className="font-semibold text-left">
                        {user.orders?.length}
                      </td>

                      <td className="font-black text-blue-500">{total}</td>

                      <td>
                        <div className={styles.actionContainer}>
                          <Link
                            href={`/Components/dashboard/customer/${user.id}`}
                            className={`${styles.actionBtn} ${styles.viewBtn}`}
                            title="View Profile"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Link>
                          <button
                            className={`${styles.actionBtn} ${styles.emailBtn}`}
                            type="button"
                            onClick={() => setmessage(true)}
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>
                          <input type="hidden" name="message" value={message} />

                          <button
                            className={`${styles.actionBtn} ${styles.blockBtn}`}
                            type="button"
                            onClick={() => {
                              setisopen(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faUserSlash} />
                          </button>
                          <input type="hidden" name="block" value={block} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}
