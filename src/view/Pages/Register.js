import { Link } from "react-router-dom";
import Nav from '../component/Navigation';
import React, { useState, useEffect } from 'react';
import { auth, database, createUserWithEmailAndPassword, ref, set } from '../component/DatabaseConfig';
import styles from'../Css/Login.module.css';

const RegisterPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user_name, setUser_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  // useEffect(() => {
  //   // Add a listener to detect authentication state changes
  //   // const unsubscribe = auth.onAuthStateChanged(user => {
  //   //   if (user) {
  //   //     // User is logged in
  //   //     console.log('User is logged in:', user.email);
  //   //     setIsLoggedIn(true);
  //   //   } else {
  //   //     // User is logged out
  //   //     console.log('User is logged out');
  //   //     setIsLoggedIn(false);
  //   //   }
  //   // });

  //   return () => {
  //     // Unsubscribe the listener when the component unmounts
  //     unsubscribe();
  //   };
  // }, [auth]);


  const register = () => {
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is Outta Line!!');
      return;
    }

    if (password !== confirm_password) {
      alert("password not match!!");
      return;
    }

    // Move on with Auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Declare user variable
        const user = userCredential.user;
        // Add this user to Firebase Database
        const database_ref = ref(database);

        // Create User data
        const user_data = {
          user_name: user_name,
          email: email,
          last_login: Date.now()
        };

        // Push to Firebase Database
        set(ref(database, 'users/' + user.uid), user_data);

        // Done
        alert('User Created!!');
      })
      .catch(error => {
        // Firebase will use this to alert of its errors
        const error_code = error.code;
        const error_message = error.message;

        alert(error_message);
      });
  };

  const validate_email = (email) => {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  };

  const validate_password = (password) => {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
  };

  return (
    <>
      <Nav />
     

      <div className={styles.container}> 
      <header className={styles.top}>Regi<span style={{ color: 'yellow' }}>ster</span></header>
        <div className={`${styles.registration} ${styles.form}`}>
          <form action="#">
            <input
              type="text"
              id="user_name"
              placeholder="Enter your username"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              id="con_password"
              placeholder="Confirm your password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="button"
              className={styles.button}
              onClick={() => register()}
              value="Register"
            />
          </form>
          <div className={styles.signup1}>
            <span className={styles.signup1}>
              Already have an account?
              <Link to="/login">
                <button htmlFor="check" className={styles.connector}>Login</button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
