import "./NewListModal.css";
import React, { useContext, useEffect, useState } from "react";
import Color from "./Color";
import ColorModal from "./ColorModal";
import { AddListContext } from "../../contexts/AddListContext";
import axios from "axios";

const NewListModal = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [listName, setListName] = useState("");
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);
  const [showColorButtonModal, setShowColorButtonModal] = useState(false);

  //for color modal
  const [selectedColor, setSelectedColor] = useState({
    colorName: "",
    color: "",
  });

  const {
    setShowAddListModal,
    update,
    setUpdate,
    addListModalMode,
    listToEdit,
    setListToEdit,
  } = useContext(AddListContext);

  useEffect(() => {
    if (listName === "") {
      setIsAddBtnDisabled(true);
    } else {
      setIsAddBtnDisabled(false);
    }
  }, [listName]);

  useEffect(() => {
    if (addListModalMode === "edit") setIsEditMode(true);

    // eslint-disable-next-line
  }, []);

  const submitListModal = () => {
    isEditMode ? editList() : submitList();
  };

  //this function will edit an existing list
  const editList = async () => {
    const listInfo = {
      oldName: listToEdit,
      newName: listName,
      color: selectedColor.color,
      userId: localStorage.getItem("userId"),
    };

    await axios
      .patch("http://localhost:3300/editList", listInfo, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.message);
        return err;
      });
    update ? setUpdate(false) : setUpdate(true);
    setShowAddListModal(false);
  };

  //this function will create a new list
  const submitList = async () => {
    const listInfo = {
      name: listName,
      color: selectedColor.color,
      userId: localStorage.getItem("userId"),
    };

    await axios
      .post("http://localhost:3300/createList", listInfo, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    // This functions allows a refresh of the page one a list is added
    update ? setUpdate(false) : setUpdate(true);
    setShowAddListModal(false);
  };

  return (
    <div className="NewListModal">
      <div className="nl-modal-header">
        {/* set the heading text based on the mode */}
        {isEditMode ? "Edit List: " + listToEdit : "Add List"}
      </div>
      <div className="list-name-input-container">
        <div className="list-name-header">
          {/* set text above the name input based on the mode */}
          {isEditMode ? "New Name " : "Name"}
        </div>
        <input
          className="list-name-input"
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <div className="list-color-input-container">
        {/* set the text above the color input based on the mode */}
        <div className="list-color-header">
          {isEditMode ? "New Color" : "Color"}
        </div>
        <button
          className="color-dropdown-button-container"
          onClick={() =>
            showColorButtonModal
              ? setShowColorButtonModal(false)
              : setShowColorButtonModal(true)
          }
        >
          <Color
            colorName={selectedColor.colorName}
            color={selectedColor.color}
            colorState={"inButton"}
            setShowColorButtonModal={setShowColorButtonModal}
          />
        </button>
        {showColorButtonModal ? (
          <div className="color-modal-container">
            <ColorModal
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              setShowColorButtonModal={setShowColorButtonModal}
              showColorButtonModal={showColorButtonModal}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="nlm-buttons-container">
        <button
          className="nlm-button cancel-button"
          onClick={() => {
            setShowAddListModal(false);
            setIsEditMode(false);
            setListToEdit("");
          }}
        >
          Cancel
        </button>
        <button
          className="nlm-button add-button"
          disabled={isAddBtnDisabled}
          onClick={() => {
            submitListModal();
            setIsEditMode(false);
            setListToEdit("");
            setShowAddListModal(false);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewListModal;
