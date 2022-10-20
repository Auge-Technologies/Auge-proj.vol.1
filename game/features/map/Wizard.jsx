import React from "react";
import Image from "next/image";
import styles from "./Map.module.scss";

export const Wizard = ({ type }) => {
  return (
    <div className={styles.wizard}>
      <Image src={`/wizards/${type}.png`} width={200} height={200} />
    </div>
  );
};
