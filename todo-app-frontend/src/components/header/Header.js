import "./Header.css";
import React, { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";
import axios from "axios";

const Header = () => {
  const [userLetter, setUserLetter] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    getUserLetter();
  }, []);

  //get the username of the current user
  //this will be used to set the correct letter in the top right corner of the app
  const getUserLetter = async () => {
    await axios
      .post(
        "http://localhost:3300/userLetter",
        { userId: localStorage.getItem("userId") },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setUserLetter(res.data.userLetter);
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <div className="Header">
      <div className="app-name-container">To-do List App</div>
      <div className="user-info-container">
        <button
          className="user-logo"
          onClick={() =>
            showLogoutModal
              ? setShowLogoutModal(false)
              : setShowLogoutModal(true)
          }
        >
          <div className="user-logo-text">{userLetter}</div>
        </button>
        {showLogoutModal ? <LogoutModal /> : <></>}
      </div>
    </div>
  );
};

export default Header;
