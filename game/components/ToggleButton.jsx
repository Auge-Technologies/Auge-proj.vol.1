import React from "react";

export const ToggleButton = ({ text, toggled, toggleOn, toggleOff }) => {
  return (
    <button
      onClick={toggled ? toggleOff : toggleOn}
      style={{ backgroundColor: toggled ? "black" : "white" }}
    >
      {text}
    </button>
  );
};
