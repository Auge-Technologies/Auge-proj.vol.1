import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";

const Welcome = () => {
  const router = useRouter();
  return (
    <Container>
      <ImageOverlay
        leftImage="/onboarding/onboarding-1-left.png"
        rightImage="/onboarding/onboarding-1-right.png"
      />
      Heisann hoppsann
      <Button onClick={() => router.push("/onboarding/name")}>Start</Button>
    </Container>
  );
};

export default Welcome;
