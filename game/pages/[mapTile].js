import { Map } from "../features/map/Map";
import { MapMarker } from "../features/map/MapMarker";
import client from "../lib/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Character } from "../features/character/Character";
import { Button } from "../components/Button/Button";
import { useContext } from "react";
import { CharacterContext } from "../context/characterPositionContext";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

  return (
    <>
      <Map
        name={name}
        inputConnectionCount={inputConnections?.length}
        outputConnectionCount={outputConnections.length}
        route={route}
        skillId={skillId}
      />
      <ul style={{ position: "absolute", left: 0 }}>
        {inputConnections?.map(({ name, _id }) => (
          <li key={_id}>
            <Link href={_id}>{name}</Link>
          </li>
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
