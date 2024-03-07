import "./PriorityModal.css";
import React from "react";
import Priority from "./Priority";

const PriorityModal = () => {
  const priorities = {
    High: "#ff421c",
    Medium: "#f7ce52",
    Low: "#4f8be0",
    None: "#ffffff",
  };

  const createPriorityArr = () => {
    let arr = [];
    for (const [key, value] of Object.entries(priorities)) {
      const div = <Priority priorityName={key} color={value} key={key} />;
      arr.push(div);
    }
    return arr;
  };

  return <div className="PriorityModal">{createPriorityArr()}</div>;
};

export default PriorityModal;
