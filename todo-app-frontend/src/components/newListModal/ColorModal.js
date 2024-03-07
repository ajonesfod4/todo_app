import "./ColorModal.css";
import React from "react";
import Color from "./Color";

const ColorModal = ({
  setSelectedColor,
  selectedColor,
  setShowColorButtonModal,
  showColorButtonModal,
}) => {
  const colorList = {
    red: "#db565e",
    orange: "#eba959",
    yellow: "#faf178",
    green: "#82e885",
    teal: "#70c4ba",
    blue: "#85a0f2",
    purple: "#a23cf6",
    gray: "#8f8f8f",
  };

  const renderArr = () => {
    let arr = [];

    for (const [key, value] of Object.entries(colorList)) {
      const c = (
        <Color
          colorName={key}
          color={value}
          //colorState should have 3 possible values: 'none', 'checked', 'inButton'
          colorState={selectedColor.colorName === key ? "checked" : "none"}
          key={key}
          setSelectedColor={setSelectedColor}
          setShowColorButtonModal={setShowColorButtonModal}
          showColorButtonModal={showColorButtonModal}
        />
      );
      arr.push(c);
    }
    return arr;
  };

  return <div className="ColorModal">{renderArr()}</div>;
};

export default ColorModal;
