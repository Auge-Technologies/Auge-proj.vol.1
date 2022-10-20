import React from "react";
import client from "../../lib/client";
import { useRouter } from "next/router";

const SkillDialogue = ({ dialogue, skillId }) => {
  const router = useRouter();
  return (
    <div>
      <ul>
        {dialogue.map((text) => (
          <li>{text}</li>
        ))}
      </ul>
      <button onClick={() => router.push("/" + skillId)}>Ferdig</button>
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
        dialogue
      }[0]
    `,
      { skillId }
    )) || {};

  return {
    props: { ...result, skillId },
  };
}

export default SkillDialogue;
