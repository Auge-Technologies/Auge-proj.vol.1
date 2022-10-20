import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { CharacterContext } from "../../context/characterPositionContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Map.module.scss";

export const OpenDialogueButton = ({ skillId }) => {
  const { height, width } = useWindowDimensions();
  const { pos } = useContext(CharacterContext);
  const threshold = 200;
  const router = useRouter();

  const isNear =
    Math.abs(width / 2 - pos.x) < threshold &&
    Math.abs(height / 2 - pos.y) < threshold;

  const openQuest = ({ key }) => {
    if (key === "e") router.push(`skill-dialogue/${skillId}`);
  };

  useEffect(() => {
    window.addEventListener("keydown", openQuest);
    return () => {
      window.removeEventListener("keydown", openQuest);
    };
  }, []);

  return height && isNear ? (
    <Button className={styles.openDialogueButton} onClick={openQuest}>
      Trykk på E
    </Button>
  ) : null;
};
