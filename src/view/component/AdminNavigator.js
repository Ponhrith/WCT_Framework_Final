import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faFlag, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFlag as farFlag } from '@fortawesome/free-regular-svg-icons';
import styles from "../Css/AdminNav.module.css";

library.add(faHouse, faFlag, faRightToBracket, farFlag);

const AdminNav = () => {

  return (
    <>
      <header className={styles.admin}>Admin</header>
      <nav className={styles.navigator}>
          <Link to="/admin"className={styles.tracking}>Tracking</Link>
          <Link to="/adminApprove" className={styles.approval}>Approval</Link>
      </nav>
      <h1 className={styles['reportList']}><i className="bi bi-calendar3-event"></i>&nbsp;&nbsp;&nbsp;&nbsp;Report Today :</h1>
    </>
  );
};

export default AdminNav;
