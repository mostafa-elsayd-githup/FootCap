"use client";
import React, { useActionState, useState } from "react";
import Link from "next/link";
import styles from "./block.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBoxOpen,
  faUsers,
  faBan,
  faUserSlash,
  faTrashArrowUp,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import UnblockUsers from "./serverAction";
export default function BlockListClient({ blockedUsers }) {
  const users = blockedUsers;
  const [Unblock, setUnblockBut] = useState("");
  const [UnblockMessage, setUnblocMessage] = useState("");
  const initialsate = { state: null, message: "" };
  const [state, formAction, pending] = useActionState(
    UnblockUsers,
    initialsate,
  );
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };
  return (
    <div className={styles.adminContainer}>
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
          <div
            className={`${styles.navLink} ${isProductsOpen ? styles.activeLink : ""}`}
            onClick={toggleProducts}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faBoxOpen}
                style={{ marginRight: "10px" }}
              />
              Products
            </span>

            <FontAwesomeIcon
              icon={isProductsOpen ? faChevronUp : faChevronDown}
              size="xs"
            />
          </div>
          {isProductsOpen && (
            <div className={styles.subMenu}>
              <Link
                href="/Components/dashboard/product/t-shirts"
                className={styles.subNavLink}
              >
                T-shirts
              </Link>
              <Link
                href="/Components/dashboard/product/shoes"
                className={styles.subNavLink}
              >
                Shoes
              </Link>
              <Link
                href="/Components/dashboard/product/accessories"
                className={styles.subNavLink}
              >
                Accessories
              </Link>
            </div>
          )}
          <Link
            href="/Components/dashboard/customer"
            className={styles.navLink}
          >
            <FontAwesomeIcon icon={faUsers} /> Customers
          </Link>
          <Link
            href="/Components/dashboard/blockList"
            className={`${styles.bolckLink} ${styles.activeLink}`}
          >
            <FontAwesomeIcon icon={faBan} /> Block List
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <form onClick={(e) => e.stopPropagation()} action={formAction}>
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
          <div className={styles.headerArea}>
            <div className={styles.titleArea}>
              <h1>Block List</h1>
              <p>Managing prohibited accounts and auditing data</p>
            </div>

            <div className={styles.statsBadge}>
              <span className={styles.statsCount}>{users?.length || 0}</span>
              <span
                style={{ fontSize: "14px", color: "var(--color-secondary)" }}
              >
                Banned Account
              </span>
            </div>
          </div>

          <div className={styles.usersGrid}>
            {users && users.length > 0 ? (
              users.map((item) => (
                <div key={item.id} className={styles.blockCard}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      <FontAwesomeIcon
                        icon={faUserSlash}
                        className={styles.iconMuted}
                      />
                    </div>
                    <div className={styles.userDetails}>
                      <h3>{item.name}</h3>
                      <p>{item.email}</p>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: "bold",
                          color: "var(--color-secondary)",
                        }}
                      >
                        REASON
                      </span>
                      <span className={styles.statusTag}>PERMANENT BLOCK</span>
                    </div>
                    <button
                      className={styles.unblockBtn}
                      onClick={() => setUnblockBut(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashArrowUp} />
                      Unblock
                    </button>
                    <input type="hidden" name="BlockBut" value={Unblock} />
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <FontAwesomeIcon
                  icon={faBan}
                  size="4x"
                  style={{ marginBottom: "20px" }}
                />
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  No Restricted Users
                </p>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
