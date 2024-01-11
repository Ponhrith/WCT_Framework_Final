import React, { useEffect, useState } from "react";
import Nav from "../component/Navigation";
import ReportCard from "../component/ReportCard";
import profilelogo from "../Image/profilelogo.png";
import { auth, ref, get, database, onValue } from "../component/DatabaseConfig";
import styles from "../Css/User.module.css";
import { Link } from "react-router-dom";

const UserPage = () => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      setUser(currentUser);

      const userRef = ref(database, `users/${currentUser.uid}`);

      get(userRef)
        .then((snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.user_name) {
            setUsername(userData.user_name);
            setUserEmail(userData.email);
          } else {
            console.error('User data or user_name not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.message);
        });
    }
  }, []); 
 
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  console.log('User Email:', userEmail);

  return (
    <>
      <Nav />
      <div id={styles['profileContainer']}>
        <label>
          <img id={styles['profileImage']} src={profilelogo} alt="Profile" />
        </label>
        <div className={styles.username}>Welcome {username}</div>
        <h1 className={styles['reportList']}>
          <i className="bi bi-calendar3-event"></i>&nbsp;&nbsp;&nbsp; &nbsp;Report History :
        </h1>
      </div>
      <ul id={styles['reportList']}>
        {/* Render ReportCard component inside the ul element */}
        <ReportCard filterStatus={'Email'} userEmail={userEmail} />
      </ul>
      <div className={styles['btnContainer']}>
        <Link to="/">
          <button id={styles.Logout} onClick={handleLogout}>
            Logout
          </button>
        </Link>
      </div>
    </>
  );
};

export default UserPage;
