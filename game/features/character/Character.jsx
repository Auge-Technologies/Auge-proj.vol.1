import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "../../context/characterPositionContext";
import style from "./Character.module.scss";

export const Character = () => {
  const { pos, updatePos } = useContext(CharacterContext);

  let animationRef = null;
  const characterRef = useRef(null);

  const setPosition = () => {
    const newPos = { x: 0, y: 0 };
    newPos.y = characterRef.current.style.top;
    newPos.x = characterRef.current.style.left;
    updatePos(newPos);
  };

  useEffect(() => {
    // setInterval(setPosition, 100);
  });

  useEffect(() => {
    const pos = { x: 0, y: 0 };
    const speed = 3;
    const allowedKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "w",
      "a",
      "s",
      "d",
    ];
    let directions = [];

    const handleKeydown = (event, callback) => {
      if (!allowedKeys.includes(event.key)) return;
      addDirection(event.key);
    };

    const handleKeyup = (event) => {
      if (!allowedKeys.includes(event.key)) return;
      removeDirection(event.key);
    };

    const addDirection = (key) => {
      directions = [...new Set([...directions, key])];
    };
    const removeDirection = (key) => {
      directions = directions.filter((k) => k !== key);
    };

    const moveCharacter = () => {
      const deltaPos = { x: 0, y: 0 };
      if (directions.includes("ArrowUp") || directions.includes("w"))
        deltaPos.y -= speed;
      if (directions.includes("ArrowDown") || directions.includes("s"))
        deltaPos.y += speed;
      if (directions.includes("ArrowLeft") || directions.includes("a"))
        deltaPos.x -= speed;
      if (directions.includes("ArrowRight") || directions.includes("d"))
        deltaPos.x += speed;

      pos.x += deltaPos.x;
      pos.y += deltaPos.y;

      characterRef.current.style.top = pos.y + "px";
      characterRef.current.style.left = pos.x + "px";
      setPosition();

      animationRef = window.requestAnimationFrame(moveCharacter);
    };

    const setup = () => {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("keyup", handleKeyup);
      animationRef = window.requestAnimationFrame(moveCharacter);
    };

    const cleanup = () => {
      window.cancelAnimationFrame(animationRef);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };

    setup();
    return cleanup;
  }, []);

  return <div ref={characterRef} className={style.character} />;
};
