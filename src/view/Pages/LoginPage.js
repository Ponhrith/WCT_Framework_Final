import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, ref, set } from '../component/DatabaseConfig';
import Nav from '../component/Navigation';
import styles from '../Css/Login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Uncomment or remove this block based on your needs
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) {
    //     // User is logged in
    //     console.log('User is logged in:', user.email);
    //     setIsLoggedIn(true);
    //   } else {
    //     // User is logged out
    //     console.log('User is logged out');
    //     setIsLoggedIn(false);
    //   }
    // });

    // return () => {
    //   // Unsubscribe the listener when the component unmounts
    //   unsubscribe();
    // };
  }, [auth]);

  const login = () => {
    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
      alert('Email or Password is Outta Line!!');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Declare user variable
        const user = auth.currentUser;

        // Add this user to Firebase Database
       

        // Create User data
        const user_data = {
          last_login: Date.now(),
        };

        // // Push to Firebase Database
        // set(ref(database, 'users/' + user.uid), user_data);

        // Check if the email and password match the admin credentials
        if (email.toLowerCase() === 'adminrupp@gmail.com' && password === 'adminpass') {
          // Redirect to admin page
        navigate("/admin");
        } else {
          // Redirect to profile page
          navigate("/user");
        }

        // Call the function to update the login icon after a successful login
        alert('Logged in success!!');
      })
      .catch(error => {
        // Firebase will use this to alert its errors
        const error_message = error.message;
        alert(error_message);
      });
  };
  
  const validateEmail = (email) => {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  };

  const validatePassword = (password) => {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
  };

  return (
    <>
      <Nav />
     

    <div className={styles.container}> 
    <header className={styles.top}>Log<span style={{ color: 'yellow' }}>In</span></header>
      <div className={`${styles.registration} ${styles.form}`}>
        <form >
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="button"
            className={styles.button}
            onClick={() => login()}
            value="LogIn"
          />
        </form>
          <span className={styles.signup1}>
            Don't have an account?
          </span>
        <Link to="/register">
              <button htmlFor="check" className={styles.connector}>Sign up</button>
            </Link>
      </div>
</div>
</>
    
  );
};

export default LoginPage;
