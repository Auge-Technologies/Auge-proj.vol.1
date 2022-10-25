import React, { useEffect } from "react";
import { cn } from "../../lib/helpers";
import styles from "./Map.module.scss";

export const MapMarker = ({ route, label, top, left }) => {

  const clickedMarker = () => {
    if(left){route("left", top)}
    if(!left){route('right', top)}
  };


  return (
    <span
      className={cn(styles.mapMarker, left ? styles.left : "")}
      style={{ top }}
      onClick={() => clickedMarker()}
    >
      {label}
    </span>
  );
};
