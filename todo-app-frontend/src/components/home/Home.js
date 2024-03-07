import "./Home.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import LeftPanel from "../leftPanel/LeftPanel";
import MainView from "../mainView/MainView";
import { AddListContext } from "../../contexts/AddListContext";
import axios from "axios";

const Home = () => {
  //color used to color a list on the left panel
  const [selectedColor, setSelectedColor] = useState({
    colorName: "",
    color: "",
  });

  /**
   * *userListInfo contains all lists for a user and the info for regarding their lists
   * this is an array of list objects that contains the data for each list
   * this array is used to populate the information throughout the app
   *
   * {
   *  listID: int,
   *  listName: string,
   *  color: string,
   *  tasks: [
   *    {
   *      description: string,
   *      dueDate: date string,
   *      priority: string,
   *    }
   *   ]
   * }
   *
   */
  const [userListInfo, setUserListInfo] = useState([]);

  //These are used to show and hide modals
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [addListModalMode, setAddListModalMode] = useState("");
  const [listToEdit, setListToEdit] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  //This is only to toggle between true and false to update the app when an API call
  //is made within the app and data is changed in the database
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //checks if the token is expired
    checkUserAuth().then((res) => {
      console.log(res);
      return;
    });

    //populates the userListInfo array
    getListItems().then((res) => {
      setUserListInfo(res.data);
    });

    // eslint-disable-next-line
  }, [update]);

  const getListItems = async () => {
    const response = await axios
      .post(
        "http://localhost:3300/listItems",
        { userId: localStorage.getItem("userId") },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
    return response;
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

    //if the token is expired, navigate to the login page
    if (!response.data.auth) navigate("/login");
  };

  return (
    <AddListContext.Provider
      value={{
        setSelectedColor,
        setShowAddListModal,
        setShowAddTaskModal,
        setUpdate,
        setAddListModalMode,
        setListToEdit,
        selectedColor,
        showAddListModal,
        showAddTaskModal,
        userListInfo,
        update,
        addListModalMode,
        listToEdit,
      }}
    >
      <div className="Home">
        <header className="home-header">
          <Header />
        </header>
        <main className="main-content">
          <div className="left-panel">
            <LeftPanel />
          </div>
          <div className="right-panel">
            <MainView />
          </div>
        </main>
      </div>
    </AddListContext.Provider>
  );
};

export default Home;
