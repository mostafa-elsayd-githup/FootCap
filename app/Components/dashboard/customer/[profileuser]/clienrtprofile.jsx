"use client";
import React from "react";
import styles from "./profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCalendarAlt,
  faShoppingCart,
  faWallet,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const AdminUserProfile = ({ user }) => {
  const totalprice = user.order.reduce((acc, item) => {
    return acc + parseFloat(item.totalprice);
  }, 0);

  const total = new Intl.NumberFormat("en", {
    notation: "compact",
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 3,
  }).format(totalprice);

  const time = new Date(user.createdAt);
  const year = time.getFullYear();
  const mounth = time.getMonth();
  const day = time.getDay();

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user.name[0].toUpperCase()}</div>
          <div>
            <h1 className={styles.userName}>{user.name}</h1>
            <span className={styles.badge}>Actiove</span>
          </div>
        </div>
        <div className={styles.quickActions}>
          <button className={styles.btnPrimary}>Edit User</button>
          <button className={styles.btnDanger}>Suspend</button>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FontAwesomeIcon icon={faWallet} className={styles.icon} />
          <div>
            <p className={styles.statLabel}>Total Revenue</p>
            <p className={styles.statValue}>{total}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
          <div>
            <p className={styles.statLabel}>Orders count</p>
            <p className={styles.statValue}>{user.order.length} Orders</p>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.detailsCard}>
          <h3>Account Information</h3>
          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>{user.email}</span>
          </div>
          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Joined: {`${mounth}/${day}/${year}`}</span>
          </div>
          <div className={styles.infoRow}>
            <FontAwesomeIcon icon={faUserShield} />
            <span>Role: {user.role}</span>
          </div>
        </div>

        <div className={styles.orderHistory}>
          <h3>Recent Orders</h3>
          <table className={styles.table}>
            <thead className={styles.thead_table}>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {user.order.map((ord, index) => {
                const ordertime = new Date(ord.createdAt);
                const orderyear = ordertime.getFullYear();
                const ordermounth = ordertime.getMonth();
                const orderday = ordertime.getDay();
                const orderhours = ordertime.getHours();
                const orderminuts = ordertime.getMinutes();

                const total = new Intl.NumberFormat("en", {
                  notation: "compact",
                  style: "currency",
                  currency: "EGP",
                  maximumFractionDigits: 3,
                }).format(ord.totalprice);
                let x;
                if (orderhours > 12) {
                  x = "AM";
                } else {
                  x = "PM";
                }

                return (
                  <tr key={ord.id}>
                    <td>{++index}</td>
                    <td>
                      {`${ordermounth}/${orderday}/${orderyear}`} :{" "}
                      <span
                        style={{
                          color: "var(--color-feedback)",
                          fontSize: "0.8rem",
                        }}
                      >{`(${orderhours % 12}:${orderminuts} ${x})`}</span>
                    </td>
                    <td className={styles.amount}>{total} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
