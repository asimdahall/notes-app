import React from "react";
import { styled } from "styletron-react";
import uuidv4 from "uuid/v4";
import Category from "./Category";
import { useCategory } from "../../contexts/useCategory";
import { Button } from "@chakra-ui/core";
import theme from "../../theme";

const NotesContainer = styled("div", () => ({
  width: "100vw",
  minHeight: "100%",
  backgroundImage: "url('./assets/notes-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "relative",
}));

const CategoryContainer = styled("div", () => ({
  display: "flex",
  alignItems: "flex-start",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  padding: "2rem",
}));

const Overlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.3)",
});

const Heading = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "5rem",
  height: "10rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  position: "relative",
}));

const CategoryAddButton = styled(Button, () => ({
  minHeight: "14rem",
  width: "21%",
  padding: "2rem 1rem",
  marginLeft: "3rem",
  borderRadius: "6px",
  cursor: "pointer",
  color: theme.primaryColor,
}));

export default () => {
  const { categories, setCategories } = useCategory();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const handleSelectCategory = (id) => () => {
    setSelectedCategory(id);
  };
  const closeSelectedCategory = (e) => {
    e.stopPropagation();
    setSelectedCategory("");
  };

  const addCategory = () => {
    const newCategory = {
      theme: "default",
      notes: [],
      heading: "",
      id: uuidv4(),
    };
    setCategories((categories) => [...categories, newCategory]);
  };

  return (
    <NotesContainer>
      <Overlay onClick={() => setSelectedCategory("")} />
      <Heading>Start Keeping your notes</Heading>
      <CategoryContainer>
        {categories.map((category) => (
          <Category
            key={category.id}
            isFocused={selectedCategory === category.id}
            onSelect={handleSelectCategory(category.id)}
            onClose={closeSelectedCategory}
            details={category}
          />
        ))}
        <CategoryAddButton fontSize="2rem" onClick={addCategory}>
          + Add Category
        </CategoryAddButton>
      </CategoryContainer>
    </NotesContainer>
  );
};
