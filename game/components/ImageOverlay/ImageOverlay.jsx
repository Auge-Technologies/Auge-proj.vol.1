import Image from "next/image";
import React from "react";
import { cn } from "../../lib/helpers";
import styles from "./ImageOverlay.module.scss";

const ImageOverlay = ({ leftImage, rightImage }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.image, styles.left)}>
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="bottom right"
          src={leftImage}
          priority
          alt=""
        />
      </div>
      <div className={cn(styles.image, styles.right)}>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
          src={rightImage}
          priority
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageOverlay;
