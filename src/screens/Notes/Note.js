import React from "react";
import { styled } from "styletron-react";
import { IconButton, Tooltip } from "@chakra-ui/core";
import Datepicker from "react-datepicker";
import theme, { cardThemes } from "../../theme";
import Input from "../components/Input";
import { getExactDifference } from "../../utils";

const NoteCard = styled("div", ({ $focused }) => ({
  position: "relative",
  padding: "0.4rem",
  border: $focused ? `2px solid ${theme.grey}` : "none",
  width: "100%",
  borderRadius: "6px",
  marginTop: "0.4rem",
}));

const Note = styled("div", () => ({
  display: "flex",
}));

const Actions = styled("div", () => ({
  display: "flex",
  marginTop: "1rem",
  flexDirection: "row",
  justifyContent: "flex-start",
}));

const TextStyles = styled("div", () => ({
  display: "flex",
  justifyContent: "flex-end",
  marginLeft: "auto",
  alignItems: "flex-end",
}));

const TextStyleButton = styled("button", ({ $selected, theme }) => ({
  textTransform: "uppercase",
  padding: "0.3rem",
  height: "1.5rem",
  width: "1.5rem",
  marginLeft: "1rem",
  borderRadius: "6px",
  backgroundColor: $selected ? cardThemes[theme].primaryColor : "transparent",
  outline: "none",
}));

const TimeContainer = styled("span", () => ({
  fontSize: "0.8rem",
  paddingBottom: "0.2rem",
}));

const FooterContainer = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const Footer = styled("div", ({ $show }) => ({
  display: $show ? "flex" : "none",
  flexDirection: "column",
}));

const Preview = styled("div", ({ $bold, $italics, $underlined }) => ({
  width: "100%",
  minHeight: "0.4rem",
  fontWeight: $bold ? 800 : 400,
  fontStyle: $italics ? "italic" : "normal",
  textDecoration: $underlined ? "underline" : "none",
}));

const ButtonWithTooltip = ({ label = "", ...props }) => (
  <Tooltip zIndex={2} hasArrow label={label}>
    <IconButton
      borderColor="black"
      size="sm"
      variant="outline"
      isRound={true}
      {...props}
    />
  </Tooltip>
);

export default React.memo(
  ({
    details = {},
    isCategoryFocused,
    onUpdate,
    onDelete,
    theme,
    focusedInput,
    setFocusedInput,
  }) => {
    const {
      content = "",
      id,
      completionDate,
      completed,
      styles = [],
    } = details;
    const handleAdd = (key, value) => {
      onUpdate({
        ...details,
        [key]: value,
      });
    };

    const updateStyle = (style) => {
      content &&
        handleAdd(
          "styles",
          styles.includes(style)
            ? styles.filter((s) => s !== style)
            : [...styles, style]
        );
    };

    const isInputFocused = focusedInput === id && isCategoryFocused;

    const submitOnEnter = (e) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        e.target.value && handleAdd("content", e.target.value);
        setFocusedInput("");
      }
    };

    return (
      <NoteCard>
        <Note>
          <div
            style={{
              color: completed ? "#11FF33" : "#000",
            }}
          >
            {completed ? "✔" : "●"} &nbsp;&nbsp;
          </div>
          {isInputFocused ? (
            <Input
              autoFocus
              rows={6}
              defaultValue={content}
              $bold={styles.includes("b")}
              $italics={styles.includes("i")}
              $underlined={styles.includes("u")}
              onKeyDown={submitOnEnter}
              placeholder="Click to add a note"
              onBlur={(e) => {
                e.target.value && handleAdd("content", e.target.value);
              }}
            />
          ) : (
            <Preview
              onClick={() => {
                if (isCategoryFocused) {
                  setFocusedInput(id);
                }
              }}
              $bold={styles.includes("b")}
              $italics={styles.includes("i")}
              $underlined={styles.includes("u")}
            >
              {String(content).length
                ? String(content)
                : "Click here to add a note"}
            </Preview>
          )}
        </Note>

        <Footer $show={isInputFocused && content}>
          <FooterContainer>
            <TimeContainer>
              Time left -{" "}
              {completionDate ? getExactDifference(completionDate) : ""}
            </TimeContainer>

            <Actions>
              <ButtonWithTooltip
                label="Delete"
                disabled={!id}
                icon="delete"
                onClick={() => {
                  if (confirm("Are you sure you want to delete?")) {
                    onDelete();
                  }
                }}
              />
              <ButtonWithTooltip
                label={`Mark as ${completed ? "not complete" : "completed"}`}
                marginLeft="1rem"
                icon={completed ? "close" : "check"}
                onClick={() => content && handleAdd("completed", !completed)}
              />

              <Datepicker
                minDate={Date.now()}
                selected={
                  completionDate ? new Date(completionDate) : new Date()
                }
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                onChange={(date) => handleAdd("completionDate", date)}
                showPopperArrow={false}
                showTimeInput
                customInput={
                  <ButtonWithTooltip
                    label="Update Completion Time"
                    marginLeft="1rem"
                    icon="calendar"
                  />
                }
              />
              <TextStyles>
                <TextStyleButton
                  onClick={() => updateStyle("b")}
                  $style={{
                    fontWeight: "bold",
                  }}
                  $selected={styles.includes("b")}
                  theme={theme}
                >
                  B
                </TextStyleButton>
                <TextStyleButton
                  onClick={() => updateStyle("i")}
                  $style={{
                    fontStyle: "italic",
                  }}
                  $selected={styles.includes("i")}
                  theme={theme}
                >
                  I
                </TextStyleButton>
                <TextStyleButton
                  onClick={() => updateStyle("u")}
                  $style={{
                    textDecoration: "underline",
                  }}
                  $selected={styles.includes("u")}
                  theme={theme}
                >
                  U
                </TextStyleButton>
              </TextStyles>
            </Actions>
          </FooterContainer>
        </Footer>
      </NoteCard>
    );
  }
);
