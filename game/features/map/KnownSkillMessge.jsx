import React, { useContext } from "react";
import { Button } from "../../components/Button/Button";
import { CharacterContext } from "../../context/CharacterPositionContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Map.module.scss";

export const KnownSkillMessage = ({ skillId }) => {
  const { height, width } = useWindowDimensions();
  const { pos } = useContext(CharacterContext);
  const threshold = 600;

  const isNear =
    Math.abs(width / 2 - pos.x) < threshold &&
    Math.abs(height / 2 - pos.y) < threshold;


  return height && isNear ? (
    <Button className={styles.knownSkillMessage} >
      Du er erfaren i dette feltet, gå videre
    </Button>
  ) : null;
};