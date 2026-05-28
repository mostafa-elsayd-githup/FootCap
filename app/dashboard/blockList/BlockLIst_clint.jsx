"use client";
import React, { useActionState, useState } from "react";
import styles from "./block.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faUserSlash,
  faTrashArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import UnblockUsers from "../../../../server/blockList_server";
export default function BlockListClient({ blockedUsers }) {
  const users = blockedUsers;
  const [Unblock, setUnblockBut] = useState("");
  const [UnblockMessage, setUnblocMessage] = useState("");
  const initialsate = { state: null, message: "" };
  const [state, formAction, pending] = useActionState(
    UnblockUsers,
    initialsate,
  );

  return (
    <div className={styles.adminContainer}>
      {pending && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}
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
