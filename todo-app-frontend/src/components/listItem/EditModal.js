import "./EditModal.css";
import React, { useContext } from "react";
import { AddListContext } from "../../contexts/AddListContext";
import axios from "axios";

const EditModal = ({ listName, setShowEditModal }) => {
  const {
    update,
    setUpdate,
    setShowAddListModal,
    setAddListModalMode,
    setListToEdit,
  } = useContext(AddListContext);

  const deleteList = async () => {
    await axios
      .delete(`http://localhost:3300/deleteList?listName=${listName}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        console.log(err);
      });

    update ? setUpdate(false) : setUpdate(true);
  };

  return (
    <div className="EditModal">
      {/* ########## THE EDIT BUTTON ########## */}
      <div className="em-edit-button-container">
        <button
          className="em-edit-button"
          onClick={() => {
            setShowEditModal(false);
            setListToEdit(listName);
            setAddListModalMode("edit");
            setShowAddListModal(true);
          }}
        >
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Complete">
              <g id="edit">
                <g>
                  <path
                    d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />

                  <polygon
                    fill="none"
                    points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
        <div>Edit</div>
      </div>

      {/* ########## THE DELETE BUTTON ########## */}
      <div className="em-delete-button-container">
        <button
          className="em-delete-button"
          onClick={() => {
            deleteList();
            setShowEditModal(false);
          }}
        >
          <svg
            fill="#d94c58"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="15px"
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
        <div>Delete</div>
      </div>
    </div>
  );
};

export default EditModal;
