import { Map } from "../features/map/Map";
import client from "../lib/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Character } from "../features/character/Character";
import { Button } from "../components/Button/Button";
import { useContext } from "react";
import { CharacterContext } from "../context/characterPositionContext";

const MapScreen = ({
  name,
  inputConnections,
  outputConnections,
  wizard,
  skillId,
}) => {
  const router = useRouter();
  const goToDialogue = () => {
    router.push(`/skill-dialogue/${skillId}`);
  };
  const { pos } = useContext(CharacterContext);

  const route = (type) => {
    switch (type) {
      case "left":
        if (inputConnections?.length > 0)
          router.push({
            pathname: inputConnections[0]._id,
            query: { startDirection: "right" },
          });

        break;
      case "right":
        if (outputConnections?.length > 0)
          router.push({
            pathname: outputConnections[0]._id,
            query: { startDirection: "left" },
          });
        break;
      case "dialogue":
        console.log("dialogue");
        break;
      default:
        return;
    }
  };

  return (
    <>
      {/* <h1 style={{ width: "100%", textAlign: "center" }}>{name}</h1> */}
      <Map
        inputConnectionCount={inputConnections?.length}
        outputConnectionCount={outputConnections.length}
        route={route}
      />
      <ul style={{ position: "absolute", left: 0 }}>
        {inputConnections?.map(({ name, _id }) => (
          <li key={_id}>
            <Link href={_id}>{name}</Link>
          </li>
        ))}
      </ul>
      <ul style={{ position: "absolute", right: 0 }}>
        {outputConnections.map(({ name, _id }) => (
          <li key={_id}>
            <Link href={_id}>{name}</Link>
          </li>
        ))}
      </ul>
      {skillId && (
        <Button
          onClick={goToDialogue}
          style={{ position: "absolute", bottom: "3rem", left: "50%" }}
        >
          Åpne dialogen {pos.x} {pos.y}
        </Button>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const result = await client.fetch(`*[_type == "skill"] {
    _id
  }`);

  const paths = result.map(({ _id }) => ({
    params: { mapTile: _id },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { mapTile = "" } = context.params;
  const result =
    (await client.fetch(
      `
    *[_type == "skill" && _id == $skillId] {
      name,
      "inputConnections": prerequisiteSkills[]-> {
        _id,
        name
      },
      "outputConnections": *[references(^._id)] {
        _id,
        name
      },
      "isOrigin": count(*[_type == "path" && references(^._id)]) > 0,
      wizard->{
        name
      }
    }[0]
  `,
      { skillId: mapTile }
    )) || {};

  return {
    props: { ...result, skillId: mapTile },
  };
}
export default MapScreen;
