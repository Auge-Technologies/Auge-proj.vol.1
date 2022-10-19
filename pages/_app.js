import { CharacterPositionContextProvider } from "../context/characterPositionContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CharacterPositionContextProvider>
      <Component {...pageProps} />
    </CharacterPositionContextProvider>
  );
}

export default MyApp;
