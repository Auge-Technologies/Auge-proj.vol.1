import { useState, useEffect } from "react";

export const usePersistedState = (key, initialState) => {
  const getLocalStorage = () =>
    typeof window !== "undefined" &&
    localStorage.getItem(key) &&
    JSON.parse(localStorage.getItem(key));

  const [state, setState] = useState(getLocalStorage() || initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
