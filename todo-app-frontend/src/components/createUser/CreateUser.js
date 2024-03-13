import "./CreateUser.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//- make is so that this page uses one variable regarding pwd validation

const CreateUser = () => {
  const [newUsername, setNewUsername] = useState("");
  const [style, setStyle] = useState({ borderColor: "none" });
  const [errorMessage, setErrorMessage] = useState("");

  //pwd text validation state values
  const [lowercaseStyle, setLowercaseStyle] = useState({});
  const [uppercaseStyle, setuppercaseStyle] = useState({});
  const [numberStyle, setNumberStyle] = useState({});
  const [lengthStyle, setLengthStyle] = useState({});

  /**
   * refs are used to ensure pwd validation and styling happens after
   * every key stroke if refs are not used, then there will be a one keystroke delay in
   * one keystroke delay in the styling of the password inputs
   */
  const firstPwd = useRef("");
  const secondPwd = useRef("");
  const pwdMatchStatus = useRef("");
  const pwdTextValidationStatus = useRef({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasLength: false,
  });
  const isPwdValidated = useRef(false);

  const navigate = useNavigate();

  //sets the value of isPwdValidated
  const validatePwd = () => {
    //check if all properites of pwdTextValidationStatus are true
    const arePropsTrue = checkIfAllPropertiesAreTrue(
      pwdTextValidationStatus.current
    );

    //sets the value of isPwdValidated to true if the pwd text is validated and if the length of both pwd matches
    isPwdValidated.current =
      arePropsTrue && pwdMatchStatus === "Yes" ? true : false;
  };

  //validates the pwd and handles the styling for password inputs to reflect
  //matching or non-matching passwords
  const validatePwdMatch = (e) => {
    secondPwd.current = e.target.value;

    //password validation blocks
    //first if statement resets style if both password inputs are empty
    if (secondPwd.current === "" && firstPwd.current === "") {
      pwdMatchStatus.current = "none";
    }

    //else statement checks if passwords match
    else {
      if (firstPwd.current === secondPwd.current) {
        pwdMatchStatus.current = "yes";
      } else {
        pwdMatchStatus.current = "no";
      }
    }

    //styling blocks
    switch (pwdMatchStatus.current) {
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

  //validates the pwd text to make sure it matches what is required
  //returns true if all text validation properties are met
  const validatePwdText = (pwd) => {
    resetPwdTextValidationStatus();

    // Check if the length of the password is in the desired range
    if (pwd.length >= 8 && pwd.length <= 30) {
      pwdTextValidationStatus.current.length = true;
      setLengthStyle({ display: "none" });
    }

    // Check if the string contains at least one lowercase letter
    if (/[a-z]/.test(pwd)) {
      pwdTextValidationStatus.current.hasLowercase = true;
      setLowercaseStyle({ display: "none" });
    }

    // Check if the string contains at least one uppercase letter
    if (/[A-Z]/.test(pwd)) {
      pwdTextValidationStatus.current.hasUppercase = true;
      setuppercaseStyle({ display: "none" });
    }

    // Check if the string contains at least one number
    if (/\d/.test(pwd)) {
      pwdTextValidationStatus.current.hasNumber = true;
      setNumberStyle({ display: "none" });
    }
  };

  const resetPwdTextValidationStatus = () => {
    pwdTextValidationStatus.current.hasLowercase = false;
    setLowercaseStyle({ display: "" });

    pwdTextValidationStatus.current.hasUppercase = false;
    setuppercaseStyle({ display: "" });

    pwdTextValidationStatus.current.hasNumber = false;
    setNumberStyle({ display: "" });

    pwdTextValidationStatus.current.length = false;
    setLengthStyle({ display: "" });
  };

  const checkIfAllPropertiesAreTrue = (obj) => {
    for (let key in obj) {
      if (!obj[key]) {
        return false; // If any property is false, return false immediately
      }
    }
    return true; // If all properties are true, return true
  };

  const createUser = async () => {
    //returns out of the function if the pwd is not validated or the username is empty
    //ensures the post request is not sent
    if (pwdMatchStatus.current !== "yes") return;
    if (newUsername.length === 0) return;

    //set the user credentials to be sent as the body of the post request
    const userCredentials = {
      username: newUsername,
      password: firstPwd.current,
    };

    //-see if this condition can be put into a different function.  It feels out of place here
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
          maxLength={30}
          style={style}
          onChange={(e) => {
            firstPwd.current = e.target.value;
            validatePwdText(firstPwd.current);
            if (secondPwd.current === "" && firstPwd.current === "")
              setStyle({ border: "1px solid gray" });
          }}
        />
        <input
          className="pwd-input"
          type="password"
          placeholder="Re-enter your password"
          style={style}
          onChange={(e) => validatePwdMatch(e)}
        />
        <div className="pwd-validation-checks">
          <p className="pwd-description pwd-validation">
            Password must contain:
          </p>
          <p className="pwd-lowercase pwd-validation" style={lowercaseStyle}>
            A lowercase letter
          </p>
          <p className="pwd-uppercase pwd-validation" style={uppercaseStyle}>
            An uppercase letter
          </p>
          <p className="pwd-number pwd-validation" style={numberStyle}>
            A number
          </p>
          <p className="pwd-minimum-char pwd-validation" style={lengthStyle}>
            Minimum 8 characters
          </p>
        </div>
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
