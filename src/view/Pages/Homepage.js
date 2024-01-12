import React, { useState } from "react";
import Nav from "../component/Navigation";
import ReportCard from "../component/ReportCard";
import { Link } from "react-router-dom";
import styles from "../Css/Home.module.css";

const HomePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <>
      <Nav />
      <header className={styles.ask}>
        What<span style={{ color: 'yellow' }}>&nbsp;&nbsp;happend?</span>
      </header>
      <div className={styles.container}>
        <div className={styles["btn-container"]}>
          <Link to="/reporting">
            <button id={styles.reportButton}>Report</button>
          </Link>
          <select
            id={styles.filterSelect}
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="filter">Filter</option>
            <option value="All">All</option>
            <option value="Checking">Checking</option>
            <option value="Fixing">Fixing</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>

        <h1 className={styles.reportList}>
          <i className={`${styles.bi} ${styles["bi-calendar3-event"]}`}></i>
          &nbsp;&nbsp;&nbsp;&nbsp;Report Today :
        </h1>
        <ReportCard filterStatus={selectedFilter} />
      </div>
    </>
  );
};

export default HomePage;
