import { CharacterPositionContextProvider } from "../context/characterPositionContext";
import { KnownSkillsContextProvider } from "../context/KnownSkillsContext";
import {
  AnimatePresence,
  motion,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import "../styles/globals.css";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

function MyApp({ Component, pageProps, router }) {
  const identifier = pageProps.skillId || "";
  return (
    <KnownSkillsContextProvider>
      <CharacterPositionContextProvider>
        <LazyMotion features={domAnimation}>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <motion.main
              key={router.route.concat(identifier)}
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ type: "linear" }}
              style={{
                height: "100vh",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Component {...pageProps} />
            </motion.main>
          </AnimatePresence>
        </LazyMotion>
      </CharacterPositionContextProvider>
    </KnownSkillsContextProvider>
  );
}

export default MyApp;
