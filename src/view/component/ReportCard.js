import React, { useState, useEffect } from 'react';
import styles from '../Css/ReportCard.module.css';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCrFB0ywO4Q4DhyCms4YGNCPc-bzPtXJHo",
  authDomain: "urms-project.firebaseapp.com",
  databaseURL: "https://urms-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "urms-project",
  storageBucket: "urms-project.appspot.com",
  messagingSenderId: "624650378050",
  appId: "1:624650378050:web:32c11dee451f9d4b9d06db"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const database = getDatabase();

const ReportCard = ({ filterStatus, userEmail }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const populateReportList = () => {
      const entriesRef = ref(database, 'entries');

      onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();
        console.log('ReportCard - Retrieved data:', data);

        if (data) {
          const newReportData = Object.values(data);

          // Apply filter based on filterStatus
          const filteredReports = newReportData.filter(report => {
            switch (filterStatus) {
              case 'Fixed':
                return report.status === 'Fixed' && report.approve === true;
              case 'Checking':
                return report.status === 'Checking'&& report.approve === true;
              case 'Fixing':
                return report.status === 'Fixing' && report.approve === true;
              case 'All':
                return report.approve === true;;
              case 'Email':
                return report.email === userEmail && report.approve === true;
                case 'All':
              default:
                return report.approve === true;
            }
          });

          console.log('ReportCard - Filtered Reports:', filteredReports);
          setReportData(filteredReports);
        } else {
          setReportData([]);
        }

        setLoading(false);
      }, (error) => {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      });
    };

    populateReportList();
  }, [filterStatus, userEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div>
      <div className={styles.container}>
        <ul id="report-list">
          {reportData.length > 0 ? (
            reportData.map(report => (
              <li key={report.id}>
                <div className={styles.reportItem}>
                  {/* Image */}
                  <img className={styles.reportImage} src={report.imageUrl} alt="Report Image" />

                  {/* Report Content */}
                  <div className={styles.reportContent}>
                    <div className={styles.reportStatus}>{`Status: ${report.status}`}</div>
                    <div className={styles.reportBuilding}>{`Building: ${report.building}`}</div>
                    <div className={styles.reportFloor}>{`Floor: ${report.floor}`}</div>
                    <div className={styles.reportRoom}>{`Room: ${report.room}`}</div>
                    <div className={styles.reportDetail}>{`Detail: ${report.detail}`}</div>
                    {report.author ? (
                      <div className={styles.reportAuthor}>{`Reported by: ${report.author}`}</div>
                    ) : (
                      <div className={styles.reportAnonymous}>Anonymous</div>
                    )}
                    <div className={styles.reportDate}>{`Date: ${report.date}`}</div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReportCard;
