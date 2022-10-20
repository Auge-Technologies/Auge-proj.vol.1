import Image from "next/image";
import { cn } from "../../lib/helpers";
import { Character } from "../character/Character";
import styles from "./Map.module.scss";

export const Map = ({
  name,
  inputConnectionCount,
  outputConnectionCount,
  route,
  skillId,
}) => {
  return (
    <div className={styles.mapWrapper}>
      <Character route={route} />
      <p className={styles.name}>{name}</p>
      <div className={cn(styles.map, styles.left)}>
        <Image
          src={`/mapTiles/left-${inputConnectionCount}-foreground.png`}
          alt={`left-${inputConnectionCount}-foreground`}
          layout="fill"
          objectFit="cover"
          objectPosition={"right"}
          priority
        />{" "}
        <Image
          src={`/mapTiles/left-${inputConnectionCount}-background.png`}
          alt={`left-${inputConnectionCount}-background`}
          layout="fill"
          objectFit="cover"
          objectPosition={"right"}
          priority
        />
      </div>
      <div className={cn(styles.map, styles.right)}>
        <Image
          src={`/mapTiles/right-${outputConnectionCount}-foreground.png  `}
          alt={`right-${inputConnectionCount}-foreground`}
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          priority
        />
        <Image
          src={`/mapTiles/right-${outputConnectionCount}-background.png  `}
          alt={`right-${inputConnectionCount}-background`}
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          priority
        />
      </div>
    </div>
  );
};
