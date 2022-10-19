import { useContext } from "react";
import { CharacterContext } from "../../context/characterPositionContext";

const Character = () => {
  const { pos, updatePos } = useContext(CharacterContext);

  return <div></div>;
};

export default Character;
