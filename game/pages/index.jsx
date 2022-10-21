import { useRouter } from "next/router";
import React from "react";
import { Button } from "../components/Button/Button";
import { Container } from "../components/Container/Container";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";

const Welcome = () => {
  const router = useRouter();
  return (
    <Container>
      <ImageOverlay
        leftImage="/onboarding/onboarding-1-left.png"
        rightImage="/onboarding/onboarding-1-right.png"
      />
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Velkommen til Knowit Adventure </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <Button onClick={() => router.push("/onboarding/name")}>
          Start eventyret
        </Button>
      </div>
    </Container>
  );
};

export default Welcome;
