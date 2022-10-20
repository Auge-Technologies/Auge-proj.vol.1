import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "../../context/characterPositionContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import style from "./Character.module.scss";

export const Character = ({ route }) => {
  const { pos, updatePos } = useContext(CharacterContext);
  const { height, width } = useWindowDimensions();

  let animationRef = null;
  const characterRef = useRef(null);

  const setPosition = () => {
    const newPos = { x: 0, y: 0 };
    newPos.y = characterRef.current.style.top;
    newPos.x = characterRef.current.style.left;
    updatePos(newPos);
  };

  const outOfBounds = (direction) => {
    route(direction);
  };

  useEffect(() => {
    function handleResize() {
      if (typeof window === "undefined") return { width: null, height: null };
      const { innerWidth, innerHeight } = window;
      width = innerWidth;
      height = innerHeight;
    }
    handleResize();

    const speed = 3;
    let height, width;

    const startDirection =
      new URLSearchParams(window.location.search).get("startDirection") ||
      "left";

    console.log(width);
    const pos = { x: startDirection === "left" ? 50 : width - 50, y: 400 };

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
      if (
        (directions.includes("ArrowUp") || directions.includes("w")) &&
        pos.y > 0
      ) {
        deltaPos.y -= speed;
      }
      if (
        (directions.includes("ArrowDown") || directions.includes("s")) &&
        pos.y < height
      ) {
        deltaPos.y += speed;
      }
      if (directions.includes("ArrowLeft") || directions.includes("a")) {
        if (pos.x < 0) {
          outOfBounds("left");
        } else {
          deltaPos.x -= speed;
        }
      }
      if (directions.includes("ArrowRight") || directions.includes("d")) {
        if (pos.x > width) {
          outOfBounds("right");
        } else {
          deltaPos.x += speed;
        }
      }

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
      window.addEventListener("resize", handleResize);
      animationRef = window.requestAnimationFrame(moveCharacter);
    };

    const cleanup = () => {
      window.cancelAnimationFrame(animationRef);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
      window.removeEventListener("resize", handleResize);
    };

    setup();
    return cleanup;
  }, []);

  return <div ref={characterRef} className={style.character} />;
};
