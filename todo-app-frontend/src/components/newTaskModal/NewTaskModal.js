import "./NewTaskModal.css";
import React, { useContext, useState } from "react";
import PriorityModal from "./PriorityModal";
import Priority from "./Priority";
import { AddTaskContext } from "../../contexts/AddTaskContext";
import { AddListContext } from "../../contexts/AddListContext";
import axios from "axios";

const NewTaskModal = () => {
  const { setShowAddTaskModal, userListInfo, update, setUpdate } =
    useContext(AddListContext);

  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState({});
  const [selectedList, setSelectedList] = useState(userListInfo[0].listName);
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  const submitTask = async () => {
    await axios
      .post(
        "http://localhost:3300/addTask",
        {
          userId: localStorage.getItem("userId"),
          taskName: taskName,
          dueDate: dueDate,
          priority: priority.name,
          list: selectedList,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });

    update ? setUpdate(false) : setUpdate(true);
    setShowAddTaskModal(false);
  };

  const getOptionListArr = () => {
    let arr = [];
    for (let i = 0; i < userListInfo.length; i++) {
      const o = (
        <option key={i} onClick={(e) => setSelectedList(e.target.value)}>
          {userListInfo[i].listName}
        </option>
      );
      arr.push(o);
    }
    return arr;
  };

  return (
    <AddTaskContext.Provider value={{ setPriority }}>
      <div className="NewTaskModal">
        <div className="ntm-top-box">
          <input
            className="new-task-name"
            type="text"
            placeholder="Task Name"
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <div className="ntm-property-container">
            <div className="ntm-due-date-container">
              <div className="ntm-due-date-label">Due Date: </div>
              <input
                type="date"
                className="new-task-due-date"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="priority-container">
              <div className="priority-label">Priority: </div>
              <button
                className="priority-button"
                onClick={() =>
                  showPriorityModal
                    ? setShowPriorityModal(false)
                    : setShowPriorityModal(true)
                }
              >
                <Priority priorityName={priority.name} color={priority.color} />
                {showPriorityModal ? <PriorityModal /> : <></>}
              </button>
            </div>
          </div>
        </div>
        <div className="ntm-bottom-box">
          <div className="ntm-list-dropdown-continer">
            <select className="ntm-list-dropdown">{getOptionListArr()}</select>
          </div>
          <div className="ntm-buttons-container">
            <button
              className="cancel-button"
              onClick={() => setShowAddTaskModal(false)}
            >
              Cancel
            </button>
            <button className="add-button" onClick={() => submitTask()}>
              Add Task
            </button>
          </div>
        </div>
      </div>
    </AddTaskContext.Provider>
  );
};

export default NewTaskModal;
