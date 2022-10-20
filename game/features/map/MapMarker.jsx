import React from "react";
import { cn } from "../../lib/helpers";
import styles from "./Map.module.scss";

export const MapMarker = ({ label, top, left }) => {
  return (
    <span
      className={cn(styles.mapMarker, left ? styles.left : "")}
      style={{ top }}
    >
      {label}
    </span>
  );
};
