import { Stack } from "@mui/material";
import React, { useRef } from "react";
import { MessageList } from "./MessageList/MessageList";
import { MessageInput } from "./MessageInput/MessageInput";
import { styles } from "./styles";

export const Chat = () => {
  const listRef = useRef<HTMLUListElement | null>(null);

  const scrollToBottom = () => {
    listRef.current?.scroll({ top: listRef.current.scrollHeight });
  };

  const onResize = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight + 60 >= scrollHeight) {
        scrollToBottom();
      }
    }
  };

  return (
    <Stack direction={"column"} sx={styles.wrapper}>
      <MessageList
        getListRef={(ref) => {
          listRef.current = ref;
        }}
        scrollToBottom={scrollToBottom}
      />
      <MessageInput onResize={onResize} />
    </Stack>
  );
};
