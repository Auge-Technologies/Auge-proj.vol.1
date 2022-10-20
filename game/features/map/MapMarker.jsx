import React from "react";
import styles from "./Map.module.scss";

export const MapMarker = ({ label, top }) => {
  return (
    <span className={styles.mapMarker} style={{ top }}>
      {label}
    </span>
  );
};
