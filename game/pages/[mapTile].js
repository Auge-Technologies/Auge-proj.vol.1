import { Map } from "../features/map/Map";
import { MapMarker } from "../features/map/MapMarker";
import client from "../lib/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../context/characterPositionContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Wizard } from "../features/map/Wizard";
import { KnownSkillsContext } from "../context/KnownSkillsContext";
import { OpenDialogueButton } from "../features/map/OpenDialogue";

const MapScreen = ({
  name,
  inputConnections,
  outputConnections,
  wizard,
  skillId,
}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const goToDialogue = () => {
    router.push(`/skill-dialogue/${skillId}`);
  };
  const { knownSkills } = useContext(KnownSkillsContext);
  const { width, height } = useWindowDimensions();
  const { pos } = useContext(CharacterContext);

  const getRoute = (connections, y) => {
    const delta = height / connections.length;
    const routePositions = [...new Array(connections.length)].map(
      (_, index) => index * delta
    );
    const distances = routePositions.map((pos) => Math.abs(pos - y));
    console.log(y, routePositions, distances);
    const index = distances.indexOf(Math.min(...distances));
    return index;
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const route = (type, y) => {
    switch (type) {
      case "left":
        if (inputConnections?.length > 0)
          router.push({
            pathname: inputConnections[getRoute(inputConnections, y)]._id,
            query: { startDirection: "right" },
          });

        break;
      case "right":
        if (outputConnections?.length > 0)
          router.push({
            pathname: outputConnections[getRoute(outputConnections, y)]._id,
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

  return loading ? null : (
    <>
      <Map
        name={name}
        inputConnectionCount={inputConnections?.length || 0}
        outputConnectionCount={outputConnections.length}
        route={route}
        skillId={skillId}
      />
      {!knownSkills.includes(skillId) && (
        <>
          <Wizard />
          <OpenDialogueButton skillId={skillId} />
        </>
      )}
      <ul style={{ position: "absolute", left: 0 }}>
        {inputConnections?.map(({ name, _id }) => (
          <MapMarker label={name} top={height * 0.3} left />
        ))}
      </ul>
      <ul style={{ position: "absolute", right: 0 }}>
        {outputConnections.map(({ name, _id }, index) => {
          let pos = {
            1: { 0: 0.35 },
            2: { 0: 0.2, 1: 0.6 },
            3: { 0: 0.1, 1: 0.4, 2: 0.78 },
            4: { 0: 0.1, 1: 0.4, 2: 0.6, 3: 0.8 },
          };
          return (
            <MapMarker
              label={name}
              top={pos[outputConnections.length][index] * height}
            />
          );
        })}
      </ul>
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
