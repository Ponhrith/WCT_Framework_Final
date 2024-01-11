import React, { useState, useEffect } from 'react';
import styles from'../Css/Admin.module.css';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag as farFlag } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faEye, faWrench, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { auth } from "../component/DatabaseConfig";
import AdminNav from '../component/AdminNavigator';

const firebaseConfig = {
  apiKey: "AIzaSyCrFB0ywO4Q4DhyCms4YGNCPc-bzPtXJHo",
  authDomain: "urms-project.firebaseapp.com",
  databaseURL: "https://urms-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "urms-project",
  storageBucket: "urms-project.appspot.com",
  messagingSenderId: "624650378050",
  appId: "1:624650378050:web:32c11dee451f9d4b9d06db"
};

initializeApp(firebaseConfig);

const AdminPage = () => {

  const currentUser = auth.currentUser;

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const database = getDatabase();

  const deleteReport = (reportId) => {
    const updatedReportData = reportData.filter((report) => report.id !== reportId);
    setReportData(updatedReportData);

    remove(ref(database, `entries/${reportId}`))
      .then(() => {
        console.log('Report deleted successfully from the database.');
      })
      .catch((error) => {
        console.error('Error deleting report from the database:', error.message);
      });
  };

  const updateStatus = (reportId, newStatus) => {
    const reportRef = ref(database, `entries/${reportId}`);

    update(reportRef, { status: newStatus })
      .then(() => {
        console.log(`Report ${reportId} status updated to '${newStatus}' in the database.`);
      })
      .catch((error) => {
        console.error('Error updating report status in the database:', error.message);
      });
  };


  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  useEffect(() => {
    const populateReportList = () => {
      const entriesRef = ref(database, 'entries');

      onValue(
        entriesRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data) {
            const newReportData = Object.values(data);
            setReportData(newReportData);
          } else {
            setReportData([]);
          }

          setLoading(false);
        },
        (error) => {
          console.error('Error fetching data:', error.message);
          setError('Error fetching data. Please try again.');
          setLoading(false);
        }
      );
    };

    populateReportList();
  }, [database]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const approvedReports = reportData.filter((report) => report.approve);

return (
  <div>
  <AdminNav />
  <ul id="report-list">
    {approvedReports.length > 0 ? (
      approvedReports.map((report) => (
        <li key={report.id}>
          <div className={styles['report-item']}>
                  {/* Image */}
                  <img className={styles['report-image']} src={report.imageUrl} alt="Report Image" />

                  {/* Report Content */}
                  <div className={styles['report-content']}>
                    <div className={styles['report-status']}>{`Status: ${report.status}`}</div>
                    <div className={styles['report-building']}>{`Building: ${report.building}`}</div>
                    <div className={styles['report-floor']}>{`Floor: ${report.floor}`}</div>
                    <div className={styles['report-room']}>{`Room: ${report.room}`}</div>
                    <div className={styles['report-detail']}>{`Detail: ${report.detail}`}</div>
                    {report.author ? (
                      <div className={styles['report-author']}>{`Reported by: ${report.author}`}</div>
                    ) : (
                      <div className={styles['report-anonymous']}>Anonymous</div>
                    )}
                    <div className={styles['report-date']}>{`Date: ${report.date}`}</div>
                  </div>
                  <div className='btn container'>
                  
                  
                  <button className={styles['delete-button']} onClick={() => deleteReport(report.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <button className={styles['check-button']} onClick={() => updateStatus(report.id, 'Checking')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button className={styles['fixing-button']} onClick={() => updateStatus(report.id, 'Fixing')}>
                    <FontAwesomeIcon icon={faWrench} />
                  </button>

                  <button className={styles['fixed-button']} onClick={() => updateStatus(report.id, 'Fixed')}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </button> 
                </div>

              </div>

            </li>
          ))
        ) : (
          <p>No data available.</p>
        )}
         <div className={styles['btnContainer']}>
        <Link to="/">
          <button id={styles.Logout} onClick={handleLogout}>
            Logout
          </button>
        </Link>
      </div>
        
      </ul>
   
  </div>
);
};

export default AdminPage;
