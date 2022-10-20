import React from "react";
import { cn } from "../../lib/helpers";
import styles from "./Button.module.scss";

export const ToggleButton = ({ text, toggled, toggleOn, toggleOff }) => {
  return (
    <button
      onClick={toggled ? toggleOff : toggleOn}
      className={cn(styles.button, toggled ? styles.toggled : "")}
    >
      <div>{text}</div>
    </button>
  );
};
