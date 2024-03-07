import "./Login.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import axios from "axios";

const Login = () => {
  //grab setUsername that I am passing through the LoginContext provider
  const [errorMessage, setErrorMessage] = useState("");

  const { setUsername, setPassword, username, password, setUserId } =
    useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuth();

    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    const userCredentials = { username: username, password: password };

    const response = await axios
      .post("http://localhost:3300/login", userCredentials)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        return err;
      });

    try {
      if (response.data.auth) {
        //-
        console.log(response.data);
        setUserId(response.data.userID[0].toString());
        setErrorMessage("");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userID);
        navigate("/home");
      }
    } catch (err) {
      setErrorMessage("Request failed with status code 401");
    }
  };

  const checkUserAuth = async () => {
    const response = await axios
      .post(
        "http://localhost:3300/isUserAuth",
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    if (response.data.auth) navigate("/home");
  };

  return (
    <div className="Login">
      <div className="header">Login</div>
      <div className="not-user">
        Not a user?{" "}
        <a href="/createUser" className="create-user-link">
          Sign up
        </a>
      </div>
      <div className="form-container">
        <label>Username</label>
        <input
          type="text"
          placeholder="Type your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Type your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="error-message">
          {errorMessage === "Request failed with status code 401" ? (
            <>Incorrect username or password</>
          ) : (
            <></>
          )}
        </div>
      </div>
      <button
        className="lgn-button app-button"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
