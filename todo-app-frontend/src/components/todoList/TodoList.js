import "./TodoList.css";
import React, { useContext, useEffect, useState } from "react";
import { AddListContext } from "../../contexts/AddListContext";
import axios from "axios";

const TodoList = ({ listInfo }) => {
  const [taskArray, setTaskArray] = useState([]);
  const { update, setUpdate } = useContext(AddListContext);

  useEffect(() => {
    showTasks();

    // eslint-disable-next-line
  }, [listInfo]);

  const showTasks = () => {
    let arr = [];
    for (let i = 0; i < listInfo.tasks.length; i++) {
      const formattedDate = formatDate(listInfo.tasks[i].dueDate);
      const dateDiff = dateDifference(listInfo.tasks[i].dueDate);
      const d = (
        <tr className="tl-row" key={i}>
          <td className="tl-task">
            <button
              type="button"
              className="tl-checkbox-button app-button"
              style={{ borderColor: listInfo.color }}
              onClick={() => deleteTask(listInfo.tasks[i].description)}
            ></button>
            {listInfo.tasks[i].description}
          </td>
          <td className="tl-due-date">
            <span className="tl-formatted-date">{formattedDate}</span>
            <span
              className="tl-date-difference"
              style={dateDiff >= 0 ? { color: "green" } : { color: "red" }}
            >
              {dateDiff + "d"}
            </span>
          </td>
          <td className="tl-priority">{listInfo.tasks[i].priority}</td>
        </tr>
      );
      arr.push(d);
    }
    setTaskArray(arr);
  };

  const deleteTask = async (taskDesc) => {
    await axios
      .delete(`http://localhost:3300/deleteTask?description=${taskDesc}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .catch((err) => {
        console.log(err);
      });

    update ? setUpdate(false) : setUpdate(true);
  };

  const formatDate = (inputDate) => {
    // Split the input date string into year, month, and day
    const [year, month, day] = inputDate.split("-");

    // Create a Date object with the provided year, month (zero-based), and day
    const date = new Date(year, month - 1, day);

    // Define an array of month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the abbreviated month name using the month from the Date object
    const abbreviatedMonth = monthNames[date.getMonth()];

    // Format the date as "AbbreviatedMonth-Day"
    const formattedDate = abbreviatedMonth + "-" + day;

    return formattedDate;
  };

  const dateDifference = (date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date);
    const secondDate = new Date();

    const diffDays = Math.round((firstDate - secondDate) / oneDay);
    return diffDays;
  };

  return (
    <div className="TodoList">
      <div
        className="tl-top-color"
        style={{ backgroundColor: listInfo.color }}
      ></div>
      <div className="tl-header">{listInfo.listName}</div>
      <table className="tl-info-table">
        <tbody>
          <tr className="tl-header-row">
            <th className="tl-table-header">Task</th>
            <th className="tl-table-header">Due Date</th>
            <th className="tl-table-header">Priority</th>
          </tr>
          {taskArray}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
