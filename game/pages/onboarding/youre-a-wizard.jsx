import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";

const YoureaWizard = () => {
  const router = useRouter();
  return (
    <Container>
      <h1>You're a wizard harry</h1>
      <Button
        onClick={() => router.push("/901ae384-de3f-4adf-8c4b-29f906f4ada8")}
      >
        Begynn reisen
      </Button>
    </Container>
  );
};

export default YoureaWizard;
