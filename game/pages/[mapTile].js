import { Map } from "../features/map/Map";
import client from "../lib/client";
import Link from "next/link";

const MapScreen = ({ name, inputConnections, outputConnections, wizard }) => {
  return (
    <div>
      <h1 style={{ width: "100%", textAlign: "center" }}>{name}</h1>
      <Map
        inputConnectionCount={inputConnections?.length}
        outputConnectionCount={outputConnections.length}
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
    </div>
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
  console.log(result);
  return {
    props: result,
  };
}
export default MapScreen;
