import React from "react";
import { styled } from "styletron-react";
import { v4 as uuidv4 } from "uuid";
import {
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  PopoverContent,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverHeader,
  Button,
  IconButton,
} from "@chakra-ui/core";
import IconTheme from "../../color.svg";
import { cardThemes } from "../../theme";
import ThemePicker from "./ThemePicker";
import Note from "./Note";
import { useCategory } from "../../contexts/useCategory";

const Category = styled("div", ({ $isFocused, $theme = "default" }) => ({
  minHeight: "10rem",
  width: "21%",
  backgroundColor: cardThemes[$theme].backgroundColor,
  color: cardThemes[$theme].fontColor + "!important",
  marginBottom: "2rem",
  boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
  padding: "2rem 1rem",
  borderRadius: "6px",
  transform: $isFocused ? "scale(1.2)" : "scale(1)",
  transformOrigin: "top",
  zIndex: $isFocused ? 1 : 0,
  marginLeft: "3rem",
  transition: "0.2s transform",
}));

const CategoryHeader = styled("div", ({ $theme }) => ({
  fontSize: "1.4rem",
  color: cardThemes[$theme].fontColor,
  position: "relative",
  ":after": {
    content: '""',
    width: "8rem",
    height: "0.3rem",
    position: "absolute",
    borderRadius: "0.2px",
    backgroundColor: cardThemes[$theme].primaryColor,
    bottom: "-1rem",
    left: 0,
  },
}));

const NoteCardContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  marginTop: "2rem",
  width: "100%",
}));

export default React.memo(
  ({ isFocused = false, details = {}, onSelect, onClose }) => {
    const { heading = "", theme = "blue", notes = [], id } = details;
    const { setCategories } = useCategory();
    const handleChange = (e) => {
      e.persist();
      setCategories((categories) =>
        categories.map((category) => {
          if (id === category.id) {
            return {
              ...category,
              heading: e.target.value,
            };
          }
          return category;
        })
      );
    };

    const handleDeleteCategory = () => {
      if (confirm("Are you sure you want to delete the category?")) {
        setCategories((categories) =>
          categories.filter((category) => category.id !== id)
        );
      }
    };

    const updateTheme = (color) =>
      setCategories((categories) =>
        categories.map((category) => {
          if (category.id !== id) {
            return category;
          }
          return {
            ...category,
            theme: color,
          };
        })
      );
    const handleUpdateNote = (noteId) => (details = {}) => {
      if (!noteId) {
        setCategories((categories) =>
          categories.map((category = {}) => {
            if (id === category.id) {
              return {
                ...category,
                notes: [
                  ...(category.notes || []),
                  { ...details, id: uuidv4() },
                ],
              };
            }
            return category;
          })
        );
      } else {
        setCategories((categories) =>
          categories.map((category = {}) => {
            if (id === category.id) {
              return {
                ...category,
                notes: notes.map((note) => {
                  if (note.id === noteId) {
                    return {
                      ...note,
                      ...details,
                    };
                  }
                  return note;
                }),
              };
            }
            return category;
          })
        );
      }
    };

    const handleDeleteNote = (noteId) => () => {
      setCategories((categories) =>
        categories.map((category = {}) => {
          if (id === category.id) {
            return {
              ...category,
              notes: notes.filter((note) => note.id !== noteId),
            };
          }
          return category;
        })
      );
    };

    const [focusedInput, setFocusedInput] = React.useState(null);

    return (
      <Category
        $isFocused={isFocused}
        onClick={(e) => {
          e.stopPropagation();
          if (!isFocused) {
            setFocusedInput("");
          }
          onSelect();
        }}
        $theme={theme}
      >
        {isFocused && (
          <CloseButton
            position="absolute"
            top="0.3rem"
            right="0.3rem"
            onClick={onClose}
          />
        )}
        <CategoryHeader $theme={theme}>
          <Editable
            isPreviewFocusable={isFocused}
            value={heading}
            selectAllOnFocus={false}
          >
            <EditableInput value={heading} onChange={handleChange} />
            <EditablePreview />
          </Editable>
        </CategoryHeader>

        <NoteCardContainer>
          {notes.map((note) => (
            <Note
              key={note.id}
              theme={theme}
              details={note}
              isCategoryFocused={isFocused}
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              onUpdate={handleUpdateNote(note.id)}
              onDelete={handleDeleteNote(note.id)}
            />
          ))}
        </NoteCardContainer>
        <Note
          theme={theme}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
          onUpdate={handleUpdateNote()}
          isCategoryFocused={isFocused}
          details={{}}
        />

        <Popover placement="top">
          <PopoverTrigger>
            <Button
              title="Choose theme"
              marginTop="1rem"
              float="right"
              size="sm"
              aria-label="Choose The,e"
              icon="color"
              bg={cardThemes[theme].primaryColor}
            >
              <IconTheme
                style={{
                  color: cardThemes[theme].fontColor,
                }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent width="10rem">
            <PopoverHeader color="black">Pick A theme</PopoverHeader>
            <PopoverBody>
              <ThemePicker onThemeSelect={updateTheme} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <IconButton
          onClick={handleDeleteCategory}
          icon="delete"
          marginTop="1rem"
          float="right"
          aria-label="Delete Category"
          size="sm"
          color="white"
          marginRight="1rem"
          bg={cardThemes[theme].primaryColor}
        />
      </Category>
    );
  }
);
