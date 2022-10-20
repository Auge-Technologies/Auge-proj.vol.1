import React, { useState } from "react";
import client from "../../lib/client";
import { useRouter } from "next/router";
import styles from "./skilldialogue.module.scss"

const SkillDialogue = ({ dialogue, skillId, wizard }) => {
  const router = useRouter();
  const [dialogueText, setDialogueText] = useState(dialogue[0])
  
  const characterImages = [
    '/characters/'+wizard.characterType+'/'+wizard.characterType+'1.png',
    '/characters/'+ wizard.characterType+'/'+wizard.characterType+'2.png',
    '/characters/'+ wizard.characterType+'/'+wizard.characterType+'3.png',
    '/characters/'+wizard.characterType+'/'+wizard.characterType+'4.png']

    const [imageURI, setImageURI] = useState(characterImages[0])

  const nextDialogue = () => {
    var index  = dialogue.indexOf(dialogueText)
    if(index === -1) index = 0
    setDialogueText(dialogue[index+1])
    if(index%2 == 0){
      var imgIndex = characterImages.indexOf(imageURI)
      if(imgIndex+1 == characterImages.length) imgIndex = 0
      setImageURI(characterImages[imgIndex+1])
    }


    
  };

  return (
    <div>
      <button onClick={() => router.push("/" + skillId)}>Ferdig</button>
      <div className={styles.wizard}>
        <img src={imageURI}></img>
      </div>
      <div className={styles.textbubble}>
        <h2 className={styles.dialogue}>{dialogueText}</h2>
        <button onClick={nextDialogue}>Next</button>
      </div>
      <div className={styles.questions}>
        <button>one</button>
        <button>another</button>
        <button>another again</button>
      </div>
    </div>
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
