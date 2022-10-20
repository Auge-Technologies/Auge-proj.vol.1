import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { ToggleButton } from "../../components/Button/ToggleButton";
import { Container } from "../../components/Container/Container";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";
import { KnownSkillsContext } from "../../context/KnownSkillsContext";
import client from "../../lib/client";

const KnownSkills = ({ skills, paths }) => {
  const { knownSkills, addSkill, removeSkill } = useContext(KnownSkillsContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [knownSkills]);

  const categories = paths.map(({ name, _id }) => ({
    name,
    pathId: _id,
    skills: skills.filter(({ path }) => path?._id === _id),
  }));

  return !loading ? (
    <Container>
      <ImageOverlay
        leftImage="/onboarding/onboarding-3-left.png"
        rightImage="/onboarding/onboarding-3-right.png"
      />
      <div style={{ padding: "0 20%" }}>
        <h1>Hva kan du?</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        {categories.map(({ name, skills, pathId }) =>
          skills.length === 0 ? (
            ""
          ) : (
            <div key={pathId}>
              <br />
              <br />
              <h2>{name}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skills.map(({ name, _id }) => (
                  <ToggleButton
                    text={name}
                    toggled={knownSkills.includes(_id)}
                    toggleOn={() => addSkill(_id)}
                    toggleOff={() => removeSkill(_id)}
                    key={_id}
                  />
                ))}
              </div>
            </div>
          )
        )}
        <br />
        <br />
        <br />
        <br />
        <Button onClick={() => router.push("/onboarding/youre-a-wizard")}>
          Fullfør
        </Button>
      </div>
    </Container>
  ) : (
    ""
  );
};

export const getStaticProps = async () => {
  const result = await client.fetch(`{
    "skills": *[_type == "skill"] {name, _id, path->{_id}},
    "paths": *[_type == "path"] {name, _id}
  }`);

  return { props: { ...result } };
};

export default KnownSkills;
