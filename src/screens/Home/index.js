import React from "react";
import { styled } from "styletron-react";
import theme from "../../theme";

const Container = styled("div", () => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: "#32a852",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundAttachment: "fixed",
  backgroundImage: "url('./assets/home-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Button = styled("button", () => ({
  padding: "2rem",
  fontSize: "2rem",
  borderRadius: "5rem",
  backgroundColor: theme.primaryColor,
  color: "white",
  outline: "none",
  transition: "0.3s transform",
  ":hover": {
    transform: "translateY(-0.4rem)",
  },
}));

export default ({ history }) => {
  return (
    <Container>
      <Button onClick={() => history.push("/notes")}>
        Start taking notes 🙂
      </Button>
    </Container>
  );
};
