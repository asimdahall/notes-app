import React from "react";
import { cardThemes } from "../../theme";
import { Box } from "@chakra-ui/core";

export default ({ onThemeSelect }) => {
  return (
    <Box display="flex" flexShrink={0} flexWrap="wrap">
      {Object.keys(cardThemes).map((key) => (
        <Box
          onClick={() => onThemeSelect(key)}
          title={key}
          cursor="pointer"
          marginTop="1rem"
          marginLeft="4px"
          width="1.5rem"
          height="1.5rem"
          borderRadius="50%"
          backgroundColor={cardThemes[key].backgroundColor}
        />
      ))}
    </Box>
  );
};
