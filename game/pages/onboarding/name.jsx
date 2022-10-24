import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import { usePersistedState } from "../../hooks/usePersistedState";
import { Input } from "../../components/Input/Input";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";

const Name = () => {
  const [name, setName] = usePersistedState("name", "");
  const router = useRouter();

  const handleKeypress = (e) => {
    console.log(e.key)
    if (e.key === "Enter") {
      router.push("/onboarding/known-skills")
    }
  };

  return (
    <Container>
      <ImageOverlay
        leftImage="/onboarding/onboarding-2-left.png"
        rightImage="/onboarding/onboarding-2-right.png"
      />
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h1>Hva er navnet ditt adventurer?</h1>
        <Input onKeyPress={handleKeypress} value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => router.push("/onboarding/known-skills")}>
          De kaller meg "{name ? name : "..."}"
        </Button>
      </div>
    </Container>
  );
};

export default Name;
