import { styled } from "styletron-react";

export default styled("textarea", ({ $bold, $italics, $underlined }) => ({
  border: "none",
  width: "100%",
  padding: " 0.5rem",
  "border-radius": " 6px",
  "font-size": " 1rem",
  "border-width": " 1px",
  "background-color": "transparent",
  ":focus": {
    border: "none",
    outline: "none",
  },
  fontWeight: $bold ? 800 : 400,
  fontStyle: $italics ? "italic" : "normal",
  textDecoration: $underlined ? "underline" : "none",
}));
