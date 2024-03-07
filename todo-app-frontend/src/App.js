import "./App.css";

import { useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import CreateUser from "./components/createUser/CreateUser";
import Home from "./components/home/Home";

//- close edit modal on button press

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <LoginContext.Provider
        value={{
          setUsername,
          setPassword,
          setUserId,
          username,
          password,
          userId,
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
