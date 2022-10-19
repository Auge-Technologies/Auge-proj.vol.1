import Image from "next/image";
import { cn } from "../../lib/helpers";
import styles from "./Map.module.scss";

export const Map = ({ inputConnectionCount, outputConnectionCount }) => {
  return (
    <div>
      <div className={cn(styles.map, styles.left)}>
        <Image
          src={`/mapTiles/left-${inputConnectionCount}.png`}
          alt="Left side of map"
          layout="fill"
        />
      </div>
      <div className={cn(styles.map, styles.right)}>
        <Image
          src={`/mapTiles/right-${outputConnectionCount}.png  `}
          alt="Right side of map"
          layout="fill"
        />
      </div>
    </div>
  );
};
