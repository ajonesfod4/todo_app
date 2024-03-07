import "./MainView.css";
import React, { useContext, useEffect, useState } from "react";
import NewListModal from "../newListModal/NewListModal";
import NewTaskModal from "../newTaskModal/NewTaskModal";
import TodoList from "../todoList/TodoList";
import { AddListContext } from "../../contexts/AddListContext";

const MainView = () => {
  const [todoListArr, setTodoListArr] = useState([]);

  const { showAddListModal, showAddTaskModal, userListInfo } =
    useContext(AddListContext);

  useEffect(() => {
    const arr = createTodoListArr();
    setTodoListArr(arr);

    // eslint-disable-next-line
  }, [userListInfo]);

  const createTodoListArr = () => {
    let arr = [];
    for (let i = 0; i < userListInfo.length; i++) {
      const t = <TodoList key={i} listInfo={userListInfo[i]} />;
      arr.push(t);
    }
    return arr;
  };

  return (
    <div className="MainView">
      <div className="mv-modal-container">
        {showAddListModal ? <NewListModal /> : <></>}
        {showAddTaskModal ? <NewTaskModal /> : <></>}
      </div>
      <div className="lists-container">{todoListArr}</div>
    </div>
  );
};

export default MainView;
