import { Link } from "react-router-dom";
import Nav from '../component/Navigation';
import React, { useState, useEffect } from 'react';
import { auth, database, createUserWithEmailAndPassword, ref, set } from '../component/DatabaseConfig';
import styles from'../Css/Login.module.css';

const RegisterPage = () => {
  const [user_name, setUser_name] = useState('');
  const [user_ID, setUser_ID] = useState('');
  const [user_department, setUser_department] = useState('');
  const [user_year, setUser_year] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const register = () => {
 
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
          user_ID: user_ID,
          user_department: user_department,
          user_year: user_year,
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
    const expression = /^[^@]+@rupp\.edu\.kh$/;
    return expression.test(email);
  };

  const validate_password = (password) => {
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
              placeholder="Enter username"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
            />
            <input
              type="text"
              id="user_ID"
              placeholder="Enter student ID"
              value={user_ID}
              onChange={(e) => setUser_ID(e.target.value)}
            />
              <input
              type="text"
              id="user_department"
              placeholder="Enter department"
              value={user_department}
              onChange={(e) => setUser_department(e.target.value)}
            />
            <input
              type="text"
              id="user_year"
              placeholder="Enter year"
              value={user_year}
              onChange={(e) => setUser_year(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="Enter email"
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
