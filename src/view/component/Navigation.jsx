import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faFlag, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFlag as farFlag } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth, database, ref, get } from '../component/DatabaseConfig'; // Replace 'your-firebase-import' with the actual import statement for Firebase

import logo from "../Image/logo.png";
import styles from "../Css/Navigation.module.css";

library.add(faHouse, faFlag, faRightToBracket, farFlag);

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);

        try {
          const snapshot = await get(userRef);
          const userData = snapshot.val();

          if (userData && userData.user_name) {
            setIsLogin(true);
          } else {
            console.error('User data or user_name not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      }
    };

    checkUserLogin();
  }, []);

  return (
    <>
      <header>
        <img src={logo} className={styles.logoNav} alt="Logo" />
        <h2 className={styles.logoName}>URMS</h2>
        <nav className="navigator">
          <Link to="/"><FontAwesomeIcon className={styles.iconNav} icon={faHouse} id="here" /></Link>
          <Link to="/about"><FontAwesomeIcon className={styles.iconNav} icon={farFlag} /></Link>

          {isLogin ? (
            <Link to="/user"><FontAwesomeIcon className={styles.iconNav} icon={faUser} id="myIcon" /></Link>
          ) : (
            <Link to="/login"><FontAwesomeIcon className={styles.iconNav} icon={faRightToBracket} id="myIcon" /></Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Nav;
