import React from "react";
import { styles } from "./styles";
import { List } from "@mui/material";
import { ChatItem } from "entities/ChatItem";
import { useAppSelector } from "app/store/store";

export const ChatList = () => {
  const { chats } = useAppSelector((state) => state.channel);

  return (
    <List sx={styles.list} disablePadding>
      {chats.map((chat) => (
        <ChatItem key={chat.id} data={chat} />
      ))}
    </List>
  );
};
