"use client";
import React, { useActionState } from "react";
import styles from "./customer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBoxOpen,
  faUsers,
  faSearch,
  faEye,
  faEnvelope,
  faUserSlash,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import HandleAtion from "./serverfile";
export default function AdminCustomers({ users }) {
  const [UnblockMessage, setUnblocMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [message, setmessage] = useState(false);
  const [block, setblock] = useState(false);
  const initialstate = { state: null, message: "" };
  const [state, formAction, pending] = useActionState(
    HandleAtion,
    initialstate,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const displayUsers = state && state.length > 0 ? state : users;
  return (
    <div className={styles.adminLayout}>
      {/* loader */}
      {pending && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}
      <aside className={styles.sidebar}>
        <h2>ADMIN PANEL</h2>
        <nav>
          <Link href="/Components/dashboard" className={styles.navLink}>
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
          </Link>
          <Link href="/Components/dashboard/product" className={styles.navLink}>
            <FontAwesomeIcon icon={faBoxOpen} /> Products
          </Link>
          <Link
            href="/Components/dashboard/customer"
            className={`${styles.navLink} ${styles.activeLink}`}
          >
            <FontAwesomeIcon icon={faUsers} /> Customers
          </Link>

          <Link
            href="/Components/dashboard/blockLIst"
            className={styles.bolckLink}
          >
            <FontAwesomeIcon icon={faBan} /> Block List
          </Link>
        </nav>
      </aside>

      <div className={styles.content}>
        <form action={formAction}>
          {state?.blockState && (
            <div className={styles.dialogbackground}>
              <div className={styles.modalCard}>
                <summary className={styles.modalSummary}>
                  Are You Sure To Lift The Ban?
                </summary>
                <div className={styles.btnGroup}>
                  <button
                    onClick={() => setUnblocMessage("yes")}
                    className={styles.confirmBtn}
                  >
                    Yes, Unblock
                  </button>
                  <button
                    onClick={() => setUnblocMessage("no")}
                    className={styles.cancelBtn}
                  >
                    No, Cancel
                  </button>
                  <input
                    type="hidden"
                    name="inputdialog"
                    value={UnblockMessage}
                  />
                </div>
              </div>
            </div>
          )}
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
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className={styles.searchIcon}
                />
              </div>
              <button
                className={styles.All_user_button}
                onClick={() => window.location.reload}
              >
                {/* <i className="fa-solid fa-arrow-rotate-left "></i> */}
                All User
              </button>
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
                {displayUsers &&
                  displayUsers.map((user) => {
                    const price = user.order?.reduce((acc, item) => {
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
                      <tr key={user.createdAt} className={styles.tableRow}>
                        <td
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <div className={styles.avatar}>{user.name[0]}</div>
                          <div className="font-bold">{user.name}</div>
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
                          {user.order?.length}
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
                              title="Send Email"
                              onClick={() => setmessage(true)}
                            >
                              <FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            <input
                              type="hidden"
                              name="message"
                              value={message}
                            />

                            <button
                              className={`${styles.actionBtn} ${styles.blockBtn}`}
                              title="Block User"
                              onClick={() => setblock(user.id)}
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
