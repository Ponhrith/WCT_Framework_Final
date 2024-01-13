import Nav from '../component/Navigation';
import React, { useState, useEffect } from 'react';
import { auth, database, storage } from '../component/DatabaseConfig';
import { ref, getDatabase, get, push, set } from 'firebase/database';
import '../Css/Report.css';
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { set as setDatabase, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
  const [setDataFromDatabase] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [authorState, setAuthorState] = useState('author');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added state for authentication check
  const navigate = useNavigate(); // Get the navigation function

  const dbRef = ref(database);
  const entriesRef = child(dbRef, 'entries');

  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setIsLoggedIn(true);

        setUser(currentUser);

        const userRef = ref(database, `users/${currentUser.uid}`);

        get(userRef)
          .then((snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.user_name) {
              setUsername(userData.user_name);
              setUserEmail(userData.email);
              setSelectedUser(userData.user_name);

              const db = getDatabase(database);
              const entriesRef = ref(db, 'entries');
              entriesRef
                .get()
                .then((entriesSnapshot) => {
                  if (entriesSnapshot.exists()) {
                    setDataFromDatabase(entriesSnapshot.val());
                  } else {
                    console.log('No data available');
                  }
                })
                .catch((error) => {
                  console.error('Error fetching data:', error.message);
                });
            } else {
              console.error('User data or user_name not found.');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error.message);
          });
      } else {
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to the login page
      }
    };

    checkAuthentication();
  }, [navigate]);

  const updateRoom = () => {
    var floor = document.getElementById("floor");
    var room = document.getElementById("room");
    room.innerHTML = "";
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerHTML = "Please select a room";
    room.appendChild(defaultOption);

    if (floor.value !== "") {
      for (var i = 0; i < 10; i++) {
        var option = document.createElement("option");
        option.value = floor.value + 0 + i;
        option.innerHTML = "Room " + floor.value + 0 + i;
        room.appendChild(option);
      }
    } 
  };

  // const toggleSlider = () => {
  //   setAuthorState((prevAuthorState) => (prevAuthorState === selectedUser ? selectedUser :  "Anonymous" ));
  //   updateSlider();
  // };

  const toggleSlider = () => {
    setAuthorState((prevAuthorState) => (prevAuthorState === selectedUser ? "Anonymous" : selectedUser));
    updateSlider();
  };
  

  const updateSlider = () => {
    var checkbox = document.querySelector('.toggle-btn input');
    var slider = document.querySelector('.toggle-btn .toggle-slider');

    if (checkbox.checked) {
      slider.style.transform = 'translateX(30px)';
      slider.style.backgroundColor = '#ffff00';
    } else {
      slider.style.transform = 'translateX(0)';
      slider.style.backgroundColor = '#fff';
    }
  };

  const storeData = () => {
    if (!isLoggedIn) {
      // Redirect or handle unauthorized access
      alert('Please log in to report issues.');
      return;
    }
    const building = selectedBuilding;
    const status = "Unchecked";
    const approve = false;
    const floor = selectedFloor;
    const room = selectedRoom;
    const detail = document.getElementById('detail').value;
    const date = document.getElementById('date').value;
    const imageInput = document.getElementById('image');

    // if (!date) {
    //   alert('Please choose date.');
    //   return;
    // }

    // if (!building) {
    //   alert('Please select building.');
    //   return;
    // }
    // if (!floor) {
    //   alert('Please select floor.');
    //   return;
    // }
    // if (!room) {
    //   alert('Please select room.');
    //   return;
    // }

    if (building === '' || status === '' || floor === '' || room === '' || detail === '' || date === '') {
      alert('Please fill in all fields.');
      return;
    }  

    if (!imageInput.files[0]) {
      alert('Please select an image.');
      return;
    }

    let imageFile = imageInput.files[0];

    const id = push(ref(database, 'entries')).key;

    const userEmail = user ? user.email : '';

    const data = {
      id,
      approve,
      email: userEmail,
      building,
      status,
      floor,
      room,
      detail,
      date,
      author: authorState,
      imageUrl: '',
    };

    const imageRef = storageRef(storage, `images/${id}/${imageFile.name}`);
    uploadBytes(imageRef, imageFile)
      .then(() => getDownloadURL(imageRef))
      .then((imageUrl) => {
        data.imageUrl = imageUrl;
        setDatabase(child(ref(database), `entries/${id}`), data);
        document.getElementById('dataForm').reset();
        alert('Data stored successfully!');
      })
      .catch((error) => {
        console.error('Error uploading image:', error.message);
        alert('Error uploading image. Please try again.');
      });
  };


  return (
    <>
      <Nav />
      <header className="ask">
        <span style={{ color: 'yellow' }}>Re</span>porting
      </header>

      <section className="reporting">
        <div className="date-container">
          <label htmlFor="date">Select Date:</label>
          <input type="date" id="date" className="date-input" />
        </div>

        <form className="card">
        <select id="building" onChange={(e) => { updateRoom(); setSelectedBuilding(e.target.value); }} value={selectedBuilding}>
            <option value="">Building</option>
            <option value="1">building A</option>
            <option value="2">building B</option>
            <option value="3">building C</option>
            <option value="4">building D</option>
            <option value="5">Stem building</option>
          </select>
        </form>

        <form className="card">
          <select id="floor" onChange={(f) => { updateRoom(); setSelectedFloor(f.target.value); }} value={selectedFloor}>
            <option value="">Floor</option>
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
            <option value="3">Floor 3</option>
          </select>
        </form>

        <form className="card">
          <select id="room" required value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
            <option value="">Room</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
          </select>
        </form>

        <section className="addimage">
          <form>
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" accept="image/*" />
          </form>
        </section>

        <section className="function">
          <div className="hidename">
            <i className="bi bi-eye-slash-fill"></i> &nbsp; &nbsp;Hide Name :
          </div>
          <div className="toggle-container">
            <label className="toggle-btn">
              <input type="checkbox" onChange={() => toggleSlider()} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        <section className="input-box">
          <form id="dataForm">
            <textarea rows="1" id="detail" placeholder="Write more details..."></textarea>
          </form>
        </section>
        <form action="#">
          <button type="button" onClick={() => storeData()}>Post</button>
        </form>
      </section>
    </>
  );
};

export default ReportPage;
