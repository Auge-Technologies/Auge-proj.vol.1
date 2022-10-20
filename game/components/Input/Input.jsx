import React from "react";

export const Input = (props) => {
  return (
    <input
      {...props}
      style={{
        padding: "0.5rem 1rem",
        border: "2px solid black",
        borderRadius: "4px",
        outline: "none",
        textAlign: "center",
        fontSize: "2rem",
        display: "block",
        margin: "0 auto 2rem",
      }}
    />
  );
};
