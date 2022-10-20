import Image from "next/image";
import { cn } from "../../lib/helpers";
import { Character } from "../character/Character";
import styles from "./Map.module.scss";
import { OpenDialogueButton } from "./OpenDialogue";

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
      <OpenDialogueButton skillId={skillId} />
      <div className={cn(styles.map, styles.left)}>
        <Image
          src={`/mapTiles/left-${inputConnectionCount}-foreground.png`}
          alt="Left side of map foreground"
          layout="fill"
          objectFit="cover"
          objectPosition={"right"}
          priority
        />{" "}
        <Image
          src={`/mapTiles/left-${inputConnectionCount}-background.png`}
          alt="Left side of map background"
          layout="fill"
          objectFit="cover"
          objectPosition={"right"}
          priority
        />
      </div>
      <div className={cn(styles.map, styles.right)}>
        <Image
          src={`/mapTiles/right-${outputConnectionCount}-foreground.png  `}
          alt="Right side of map foreground"
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          priority
        />
        <Image
          src={`/mapTiles/right-${outputConnectionCount}-background.png  `}
          alt="Right side of map background"
          layout="fill"
          objectFit="cover"
          objectPosition={"left"}
          priority
        />
      </div>
    </div>
  );
};
