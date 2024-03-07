import "./LeftPanel.css";
import React, { useContext, useEffect, useState } from "react";
import ListItem from "../listItem/ListItem";
import { AddListContext } from "../../contexts/AddListContext";

const LeftPanel = () => {
  //This an array of all lists for the current user
  //It is used to display there lists in the left panel
  const [listArray, setListArray] = useState([]);

  const {
    setShowAddListModal,
    setShowAddTaskModal,
    showAddListModal,
    showAddTaskModal,
    userListInfo,
    setAddListModalMode,
  } = useContext(AddListContext);

  useEffect(() => {
    showLists();

    // eslint-disable-next-line
  }, [userListInfo]);

  const addTask = () => {
    showAddTaskModal ? setShowAddTaskModal(false) : setShowAddTaskModal(true);
    if (showAddListModal) setShowAddListModal(false);
  };

  const addList = () => {
    showAddListModal ? setShowAddListModal(false) : setShowAddListModal(true);
    if (showAddTaskModal) setShowAddTaskModal(false);
  };

  const showLists = () => {
    let listArr = [];
    for (let i = 0; i < userListInfo.length; i++) {
      const b = (
        <ListItem
          key={i}
          color={userListInfo[i].color}
          listName={userListInfo[i].listName}
        />
      );
      listArr.push(b);
    }
    setListArray(listArr);
  };

  return (
    <div className="LeftPanel">
      <button
        className="add-task-button-container app-button"
        onClick={() => {
          addTask();
        }}
      >
        <div className="add-task-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="add-task-button-text">Add Task</div>
      </button>
      <div className="list-header-container">
        <div className="list-header">My Lists</div>
        <div className="list-header-buttons">
          <button
            className="add-list-button app-button"
            onClick={() => {
              addList();
              setAddListModalMode("");
            }}
          >
            <svg width="13" height="13">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="list-container">{listArray}</div>
    </div>
  );
};

export default LeftPanel;
