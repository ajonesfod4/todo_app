import "./Color.css";
import React, { useEffect, useState } from "react";

const Color = ({
  colorName,
  color,
  colorState,
  setSelectedColor,
  setShowColorButtonModal,
  showColorButtonModal,
}) => {
  const [localColor, setLocalColor] = useState({
    colorName: colorName,
    color: color,
  });

  useEffect(() => {
    setLocalColor({ colorName: colorName, color: color });

    // eslint-disable-next-line
  }, []);

  const renderSwitch = () => {
    switch (colorState) {
      case "none":
        return <></>;
      case "checked":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            width="12"
            height="12"
            className="color-dropdown-checkmark"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M4.902 6.975l4.182-4.244a.74.74 0 0 1 1.06 0 .775.775 0 0 1 0 1.081L5.432 8.597a.74.74 0 0 1-1.06 0L1.78 5.975a.775.775 0 0 1 0-1.081.74.74 0 0 1 1.061 0l2.06 2.081z"
            ></path>
          </svg>
        );
      case "inButton":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="dropdown-chevron"
          >
            <path
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16 10-4 4-4-4"
            ></path>
          </svg>
        );

      default:
        break;
    }
  };

  const handleClick = () => {
    if (colorState !== "inButton")
      setSelectedColor({
        colorName: localColor.colorName,
        color: localColor.color,
      });

    //toggle color button modal
    showColorButtonModal
      ? setShowColorButtonModal(false)
      : setShowColorButtonModal(true);
  };

  return (
    <div
      className="Color"
      onClick={() => {
        handleClick();
      }}
    >
      <div className="color-and-name-container">
        <div className="color-circle-container">
          <div
            className="color-circle"
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <div className="color-name">{colorName}</div>
      </div>
      {renderSwitch()}
    </div>
  );
};

export default Color;
