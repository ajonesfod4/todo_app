import "./CreateUser.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const [newUsername, setNewUsername] = useState("");
  const [style, setStyle] = useState({ borderColor: "none" });
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * refs are used to ensure pwd validation and styling happens after
   * every key stroke if refs are not used, then there will be a one keystroke delay in
   * one keystroke delay in the styling of the password inputs
   */
  const firstPwd = useRef("");
  const secondPwd = useRef("");
  const pwdValidationStatus = useRef("");

  const navigate = useNavigate();

  //validates the pwd and handles the styling for password inputs to reflect
  //matching or non-matching passwords
  const validatePwd = (e) => {
    secondPwd.current = e.target.value;

    //password validation blocks
    if (secondPwd.current === "" && firstPwd.current === "") {
      pwdValidationStatus.current = "none";
    } else {
      firstPwd.current === secondPwd.current
        ? (pwdValidationStatus.current = "yes")
        : (pwdValidationStatus.current = "no");
    }

    //styling blocks
    switch (pwdValidationStatus.current) {
      case "yes":
        setStyle({ border: "2px solid green" });
        break;
      case "no":
        setStyle({ border: "2px solid red" });
        break;
      case "none":
        setStyle({ border: "1px solid gray" });
        break;
      default:
        setStyle({ border: "1px solid gray" });
        break;
    }
  };

  const createUser = async () => {
    //returns out of the function if the pwd is not validated or the username is empty
    //ensures the post request is not sent
    if (pwdValidationStatus.current !== "yes") return;
    if (newUsername.length === 0) return;

    const userCredentials = {
      username: newUsername,
      password: firstPwd.current,
    };

    if (firstPwd.current === secondPwd.current && firstPwd !== "") {
      const response = await axios
        .post("http://localhost:3300/createUser", userCredentials)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          setErrorMessage(err.message);
          console.log(err);
          return err;
        });

      //if a user is successfully created, redirect the user to the login page
      if (response.data === "user created") {
        navigate("/login");
      }
    }
  };

  return (
    <div className="CreateUser">
      <div className="header">Create New User</div>
      <div className="already-user">
        Already a user?{" "}
        <a href="/login" className="login-link">
          Log in
        </a>
      </div>
      <div className="form-container">
        <label className="cr-label">Username</label>
        <input
          type="text"
          placeholder="Type your username"
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <label className="cr-label">Password</label>
        <input
          className="pwd-input"
          type="password"
          placeholder="Type your password"
          style={style}
          onChange={(e) => {
            firstPwd.current = e.target.value;
            if (secondPwd.current === "" && firstPwd.current === "")
              setStyle({ border: "1px solid gray" });
          }}
        />
        <input
          className="pwd-input"
          type="password"
          placeholder="Re-enter your password"
          style={style}
          onChange={(e) => validatePwd(e)}
        />
        <div className="error-message">
          {errorMessage === "Request failed with status code 409" ? (
            <>Username already exists</>
          ) : (
            <></>
          )}
          {errorMessage === "Request failed with status code 401" ? (
            <>Internal server error. Please try again</>
          ) : (
            <></>
          )}
        </div>
      </div>
      <button className="lgn-button app-button" onClick={() => createUser()}>
        Create User
      </button>
    </div>
  );
};

export default CreateUser;
