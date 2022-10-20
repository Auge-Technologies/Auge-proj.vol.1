import Image from "next/image";
import { cn } from "../../lib/helpers";
import { Character } from "../character/Character";
import styles from "./Map.module.scss";

export const Map = ({ inputConnectionCount, outputConnectionCount, route }) => {
  return (
    <div className={styles.mapWrapper}>
      <Character route={route} />
      <div className={cn(styles.map, styles.left)}>
        <Image
          src={`/mapTiles/left-${inputConnectionCount}.png`}
          alt="Left side of map"
          layout="fill"
          objectFit="cover"
          objectPosition={"right"}
          priority
        />
      </div>
      <div className={cn(styles.map, styles.right)}>
        <Image
          src={`/mapTiles/right-${outputConnectionCount}.png  `}
          alt="Right side of map"
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          priority
        />
      </div>
    </div>
  );
};
