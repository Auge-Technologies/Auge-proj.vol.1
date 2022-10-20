import React from "react";
import Image from "next/image";
import styles from "./Map.module.scss";

export const Wizard = () => {
  return (
    <div className={styles.wizard}>
      <Image src="/" width={50} height={50} />
    </div>
  );
};
