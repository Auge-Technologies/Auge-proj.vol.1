import { Map } from "../features/map/Map";

const MapScreen = ({ inputConnectionCount, outputConnectionCount }) => {
  return (
    <div>
      <Map
        inputConnectionCount={inputConnectionCount}
        outputConnectionCount={outputConnectionCount}
      />
    </div>
  );
};

export async function getStaticPaths() {
  const result = [{ _id: "1" }, { _id: "2" }];

  const paths = result.map(({ _id }) => ({
    params: { mapTile: _id },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //   const res = await fetch("https://.../posts");
  //   const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      inputConnectionCount: 1,
      outputConnectionCount: 2,
    },
  };
}
export default MapScreen;
