import React, { useState } from "react";

export const CharacterContext = React.createContext();

export const CharacterPositionContextProvider = ({ children }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const updatePos = (newPos) => {
    setPos(newPos);
  };

  return (
    <CharacterContext.Provider value={{ pos, updatePos }}>
      {children}
    </CharacterContext.Provider>
  );
};
