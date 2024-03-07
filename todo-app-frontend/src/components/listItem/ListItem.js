import "./ListItem.css";
import React, { useState } from "react";
import EditModal from "./EditModal";

const ListItem = ({ color, listName }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="ListItem">
      <div className="li-bullet-and-name">
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 24 24"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.24973 12.8133L6.76473 18.1003C7.14702 18.674 7.79541 19.0133 8.48473 19.0003H14.5147C15.204 19.0133 15.8524 18.674 16.2347 18.1003L18.7497 12.8093C19.0871 12.2867 19.0871 11.6149 18.7497 11.0923L16.2487 5.89229C15.8662 5.32445 15.2223 4.98876 14.5377 5.00029H11.4987H8.45973C7.77516 4.98876 7.13126 5.32445 6.74873 5.89229L4.25373 11.1003C3.91688 11.6212 3.91531 12.2908 4.24973 12.8133Z"
            stroke="gray"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="list-item">{listName}</div>
      </div>

      <button
        className="li-three-dots-button app-button"
        onClick={() => {
          showEditModal ? setShowEditModal(false) : setShowEditModal(true);
        }}
      >
        <svg
          width="15px"
          height="15px"
          viewBox="0 -0.5 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.5 12C8.5 13.1046 7.60457 14 6.5 14C5.39543 14 4.5 13.1046 4.5 12C4.5 10.8954 5.39543 10 6.5 10C7.03043 10 7.53914 10.2107 7.91421 10.5858C8.28929 10.9609 8.5 11.4696 8.5 12Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 12C14.5 13.1046 13.6046 14 12.5 14C11.3954 14 10.5 13.1046 10.5 12C10.5 10.8954 11.3954 10 12.5 10C13.6046 10 14.5 10.8954 14.5 12Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5 12C20.5 13.1046 19.6046 14 18.5 14C17.3954 14 16.5 13.1046 16.5 12C16.5 10.8954 17.3954 10 18.5 10C19.6046 10 20.5 10.8954 20.5 12Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showEditModal ? (
        <EditModal listName={listName} setShowEditModal={setShowEditModal} />
      ) : (
        <></>
      )}
      {/* {showDeleteModal ? (
        <button
          className="delete-modal app-button"
          onClick={() => {
            showDeleteModal
              ? setShowDeleteModal(false)
              : setShowDeleteModal(true);
            deleteList();
          }}
        >
          <svg
            fill="#d94c58"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 490.646 490.646"
          >
            <g>
              <g>
                <path
                  d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z
			          M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z"
                />
                <path
                  d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z
			          M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z"
                />
              </g>
            </g>
          </svg>
        </button>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default ListItem;
