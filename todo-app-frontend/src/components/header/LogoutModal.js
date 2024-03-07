import "./LogoutModal.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button className="LogoutModal" onClick={() => logout()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <g fill="none" fillRule="evenodd">
          <path
            stroke="currentColor"
            d="M6.5 8.3V5.63c0-1.17.9-2.13 2-2.13h7c1.1 0 2 .95 2 2.13v11.74c0 1.17-.9 2.13-2 2.13h-7c-1.1 0-2-.95-2-2.13V14.7"
          ></path>
          <path
            fill="currentColor"
            d="m12.8 11-2.15-2.15a.5.5 0 1 1 .7-.7L14 10.79a1 1 0 0 1 0 1.42l-2.65 2.64a.5.5 0 0 1-.7-.7L12.79 12H4.5a.5.5 0 0 1 0-1h8.3z"
          ></path>
        </g>
      </svg>
      <div>Logout</div>
    </button>
  );
};

export default LogoutModal;
