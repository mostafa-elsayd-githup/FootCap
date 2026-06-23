"use client";
import { useActionState, useState, useEffect } from "react";
import styles from "./block.module.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faUserSlash,
  faTrashArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import UnblockUsers from "@/server/blockList_server";
import Loader from "@/Components/loaderFecthing/loader";
export default function BlockListClient({ blockedUsers }) {
  const users = blockedUsers;
  const [isopen, setisopen] = useState("");
  const [block, setblock] = useState(false);

  const initialsate = { state: null, message: "" };
  const [state, formAction, pending] = useActionState(
    UnblockUsers,
    initialsate,
  );
  const handleblock = async (e) => setblock(e);
  useEffect(() => {
    if (!state) return;

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-right",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      color: "var(--color-primary)",
      background: "var(--bg-card)",
    });

    if (state.foundState === 401) {
      Toast.fire({ icon: "warning", title: state.message });
    } else if (state.deletingsuccess === true) {
      Toast.fire({ icon: "success", title: state.message });
    } else if (state.deletingsuccess === false) {
      Toast.fire({
        icon: "error",
        title: state.message || "Something went wrong",
      });
    }
  }, [
    state,
    state.deletingsuccess,
    state.foundState,
    state.message,
    state.time,
  ]);
  return (
    <div className={styles.adminContainer}>
      {pending && <Loader />}
      <main className={styles.mainContent}>
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
                  onClick={() => handleblock(true)}
                  className={styles.confirmBtn}
                >
                  Unblock
                </button>
                <button
                  type="button"
                  onClick={() => setisopen(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
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
                      type="button"
                      onClick={() => setisopen(true)}
                    >
                      <FontAwesomeIcon icon={faTrashArrowUp} />
                      Unblock
                    </button>
                    <input type="hidden" name="unblock" value={block} />
                    <input type="hidden" name="user" value={item.id} />
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
