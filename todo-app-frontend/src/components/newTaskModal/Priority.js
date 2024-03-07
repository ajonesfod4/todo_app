import "./Priority.css";
import React, { useContext } from "react";
import { AddTaskContext } from "../../contexts/AddTaskContext";

const Priority = ({ priorityName, color }) => {
  const { setPriority } = useContext(AddTaskContext);

  const renderFlag = () => {
    if (priorityName !== "None") {
      return (
        <svg
          fill={color}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="15px"
          height="15px"
          viewBox="0 0 95.529 95.528"
        >
          <g>
            <g>
              <path
                d="M16.5,0h-5.925C8.18,0,6.232,1.948,6.232,4.343c0,2.158,1.617,4.006,3.763,4.298v84.887c0,1.104,0.896,2,2,2h3.085
            c1.104,0,2-0.896,2-2V8.641h0.002c2.144-0.292,3.761-2.14,3.761-4.298C20.843,1.949,18.895,0,16.5,0z"
              />
              <path
                d="M88.005,9.313c-4.561-1.73-9.215-2.571-14.231-2.571c-6.647,0-13.089,1.491-19.317,2.934
            c-6.172,1.431-12.554,2.909-19.09,2.909c-4.531,0-8.739-0.699-12.863-2.139c-0.612-0.212-1.369-0.441-1.369-0.441v46.482
            c4.562,1.729,9.217,2.571,14.232,2.571c6.639,0,13.075-1.488,19.309-2.933c6.179-1.431,12.566-2.909,19.1-2.909
            c4.532,0,8.739,0.698,12.862,2.137c0.61,0.211,1.289,0.117,1.817-0.258c0.527-0.375,0.842-0.982,0.842-1.631V11.183
            C89.294,10.352,88.783,9.608,88.005,9.313z"
              />
            </g>
          </g>
        </svg>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div
      className="Priority"
      onClick={() => setPriority({ name: priorityName, color: color })}
    >
      <div className="flag-container">{renderFlag()}</div>
      <div>{priorityName}</div>
    </div>
  );
};

export default Priority;