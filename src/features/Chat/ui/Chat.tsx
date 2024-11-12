import { Stack } from "@mui/material";
import React from "react";
import { MessageList } from "./MessageList/MessageList";
import { MessageInput } from "./MessageInput/MessageInput";
import { styles } from "./styles";

export const Chat = () => {
  return (
    <Stack direction={"column"} sx={styles.wrapper}>
      <MessageList />
      <MessageInput />
    </Stack>
  );
};
