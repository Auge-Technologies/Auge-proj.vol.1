import React from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export const KnownSkillsContext = React.createContext();

export const KnownSkillsContextProvider = ({ children }) => {
  const [knownSkills, setKnownSkills] = usePersistedState("known-skills", []);

  const addSkill = (skillId) => {
    setKnownSkills([...new Set([...knownSkills, skillId])]);
  };

  const removeSkill = (skillId) => {
    setKnownSkills(knownSkills.filter((id) => id !== skillId));
  };

  return (
    <KnownSkillsContext.Provider value={{ knownSkills, addSkill, removeSkill }}>
      {children}
    </KnownSkillsContext.Provider>
  );
};
