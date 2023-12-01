/* UserInfo.jsx - components of User Info(Account) Page */

import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../styles/UserInfo.css";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


function UserInfo({ isDarkMode, toggleDarkMode }) {
  const [userData, setUserData] = useState([]);
  const { userId } = useParams();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fileInputRef = React.createRef(); // the user will choose an image file to upload the avatar

  const sendMessage = () => {
    console.log(message);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // this will allow the user to change avatar by clicking the avatar
  const openFileDialog = () => {
    fileInputRef.current.click(); 
  };

  // to handle avatar upload
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
  formData.append('userId', userId);

  axios.post('http://localhost:3001/user-info/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    // Update state with the avatar path returned from the backend
    setUserData({ ...userData, avatar: response.data.avatar });
  })
  .catch(error => {
    console.error("Error uploading file:", error);
  });
};

  useEffect(() => {
    console.log("fetching the event");
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/");
        return null;
      }

      const decoded = jwtDecode(token);
      // const userName = decoded.username;
      // const userID = decoded.id;
      // const userEmail = decoded.email;

      try {
        const result = await axios.get(
          `http://localhost:3001/user-info/${userId}`
        );
        setUserData({
          ...result.data,
          name: decoded.username // override `name` from the response data with `userName` from the token
        });
        console.log("Check avatar:", result.data.avatar);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  

  // This effect runs when the `isDarkMode` value changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("body-dark-mode");
    } else {
      document.body.classList.remove("body-dark-mode");
    }
    // if not in dark mode, remove this effect
    return () => {
      document.body.classList.remove("body-dark-mode");
    };
  }, [isDarkMode]);

  // Function to get the avatar URL
  const getAvatarUrl = (avatar) => {
    if (!avatar) {
        // If the avatar isn't set, return undefined or a placeholder image URL
        return undefined;
    }
    // Check if the avatar URL is a complete URL or a relative path
    return avatar.startsWith('http') ? avatar : `http://localhost:3001${avatar.startsWith('/') ? '' : '/'}${avatar}`;
};

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className={`UserInfo-full-height ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="UserInfo">
        <h1 className="page-title">Account</h1>
        
        <div className="user-detail-section" onClick={openFileDialog}>
        <img src={getAvatarUrl(userData.avatar)} 
         alt="User's Avatar"
                className="avatar"
              />
               <input 
                type="file" 
                style={{ display: 'none' }} 
                ref={fileInputRef} 
                onChange={handleAvatarUpload} 
              />
              <div className="user-name-email">
                <div className="name">{userData.name}</div>
                <div className="email">{userData.email}</div>
              </div>
            </div>
            <div className="settings-list-general">
              <ul>
                <li className="setting-title">Settings</li>
                <li className="setting-item">
                  Dark Mode
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="darkModeToggle"
                      name="darkModeToggle"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
                <li className="setting-item">Password</li>
                <button onClick={handleLogout} className="logout">
                  Logout
                </button>
                {/* Add additional settings here */}
              </ul>
            </div>
            <div className="settings-list-feedback">
              <ul>
                <li className="setting-title">Feedback</li>
                <li className="setting-item setting-item-feedback">
                  <div className="contact-us-title">Contact us</div>
                  <div className="chatbox-container">
                    <textarea
                      id="userMessage"
                      name="userMessage"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="chatbox-input"
                    />
                    <button onClick={sendMessage} className="send-button">
                      Send
                    </button>
                  </div>
                </li>
              </ul>
            </div>
        <Navbar isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default UserInfo;
