import { CharacterPositionContextProvider } from "../context/characterPositionContext";
import { KnownSkillsContextProvider } from "../context/KnownSkillsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <KnownSkillsContextProvider>
      <CharacterPositionContextProvider>
        <Component {...pageProps} />
      </CharacterPositionContextProvider>
    </KnownSkillsContextProvider>
  );
}

export default MyApp;
