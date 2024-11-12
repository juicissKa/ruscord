import { Box } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { Chat } from "features/Chat";

export const ChatChannel = () => {
  return (
    <Box sx={styles.wrapper}>
      <Chat />
    </Box>
  );
};
