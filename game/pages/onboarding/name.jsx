import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import { usePersistedState } from "../../hooks/usePersistedState";

const Name = () => {
  const [name, setName] = usePersistedState("name", "");
  const router = useRouter();
  return (
    <Container>
      Legg inn navn
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => router.push("/onboarding/known-skills")}>
        Neste
      </Button>
    </Container>
  );
};

export default Name;
