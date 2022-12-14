import React, { useEffect, useState } from "react";
import client from "../../lib/client";
import { useRouter } from "next/router";
import styles from "./skilldialogue.module.scss";
import { Button } from "../../components/Button/Button";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";
import { Container } from "../../components/Container/Container";
import { usePersistedState } from "../../hooks/usePersistedState";

const SkillDialogue = ({ dialogue, skillId, wizard }) => {
  const router = useRouter();
  if (!dialogue) {
    return (
      <Container>
        <p>Missing dialogue...</p>
        <Button onClick={() => router.push("/" + skillId)}>Gå tilbake</Button>
      </Container>
    );
  }
  const [dialogueText, setDialogueText] = useState(dialogue[0]);
  const [textDisplay, setTextDisplay] = useState(true);
  const [planPage, setPlanPage] = useState(false);
  const [name] = usePersistedState("name", "");

  const characterImages = [
    "/characters/" +
      wizard.characterType +
      "/" +
      wizard.characterType +
      "1.png",
    "/characters/" +
      wizard.characterType +
      "/" +
      wizard.characterType +
      "2.png",
    "/characters/" +
      wizard.characterType +
      "/" +
      wizard.characterType +
      "3.png",
    "/characters/" +
      wizard.characterType +
      "/" +
      wizard.characterType +
      "4.png",
  ];
  const [imageURI, setImageURI] = useState(characterImages[1]);

  const handleKeypress = (e) => {
    console.log(e.key);
    console.log("aaa");
    if (e.key === " ") {
      nextDialogue;
    }
  };

  const nextDialogue = () => {
    var index = dialogue.indexOf(dialogueText);
    index += 1;
    setDialogueText(dialogue[index]);
    if (index % 2 === 0) {
      var imgIndex = characterImages.indexOf(imageURI);
      if (imgIndex + 1 == characterImages.length) imgIndex = 0;
      setImageURI(characterImages[imgIndex + 1]);
    }
    if (index === dialogue.length) {
      setTextDisplay(false);
      setImageURI(characterImages[0]);
    }
  };

  const readAgain = () => {
    setTextDisplay(true);
    setDialogueText(dialogue[0]);
    setImageURI(characterImages[1]);
  };

  const displayPlanPage = () => {
    console.log("bs");
    setPlanPage(true);
  };

  return (
    <Container>
      <>
        {!planPage && (
          <div onKeyPress={handleKeypress}>
            <ImageOverlay
              leftImage={"/treeandbush/bush.png"}
              rightImage={"/treeandbush/tree3.png"}
            />

            <div className={styles.wizAndText}>
              {textDisplay && (
                <div className={styles.textbubble}>
                  <h2 className={styles.dialogue}>{dialogueText}</h2>
                  <Button onClick={nextDialogue}>Next</Button>
                </div>
              )}

              <img className={styles.wizard} src={imageURI} alt=""></img>
            </div>

            {!textDisplay && (
              <div className={styles.questions}>
                <Button onClick={readAgain}>på nytt</Button>
                <Button onClick={displayPlanPage}>gi meg en plan!</Button>
                <Button onClick={() => router.push("/" + skillId)}>
                  Ferdig
                </Button>
              </div>
            )}
          </div>
        )}

        {planPage && (
          <div className={styles.plan}>
            <ImageOverlay
              leftImage={"/treeandbush/bush.png"}
              rightImage={"/treeandbush/tree3.png"}
            />
            <div className={styles.graphics}>
              <img src="/pen-n-paipa.png" alt=""></img>
              <h1 className={styles.name}>some name</h1>
              <ul className={styles.list}>
                <li>greie 1</li>
                <li>greie 2</li>
                <li>greie 3</li>
                <li> greie 4</li>
              </ul>
            </div>
            <div className={styles.questions}>
              <Button onClick={() => router.push("/" + skillId)}>
                Yes tanx
              </Button>
            </div>
          </div>
        )}
      </>
    </Container>
  );
};

export async function getStaticPaths() {
  const result = await client.fetch(`*[_type == "skill"] {
    _id
  }`);

  const paths = result.map(({ _id }) => ({
    params: { skillId: _id },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { skillId = "" } = context.params;
  const result =
    (await client.fetch(
      `
      *[_type == "skill" && _id == $skillId] {
        dialogue, 
        wizard -> {name, characterType}
      }[0]
    `,
      { skillId }
    )) || {};

  return {
    props: { ...result, skillId },
  };
}

export default SkillDialogue;
