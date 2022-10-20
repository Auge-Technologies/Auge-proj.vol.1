import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import { usePersistedState } from "../../hooks/usePersistedState";

const YoureaWizard = () => {
  const [name] = usePersistedState("name", "");
  const router = useRouter();
  return (
    <Container>
      <div style={{ textAlign: "center", marginTop: "10%" }}>
        <h1>You're a wizard {name}</h1>
        <p>
          Du tryller bort oppgavene dine som en ekte trollmann. Er du klar til å
          møte andre eventyrere?
        </p>
        <div>
          <Image src="/onboarding/wizard.png" width={400} height={400} />
        </div>
        <Button
          onClick={() => router.push("/901ae384-de3f-4adf-8c4b-29f906f4ada8")}
        >
          Jeg er klar!
        </Button>
      </div>
    </Container>
  );
};

export default YoureaWizard;
