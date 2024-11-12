import { List } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { IMessage } from "entities/MessageItem/types/types";
import { MessageItem } from "entities/MessageItem";
import { useAppSelector } from "app/store/store";
import { useMessages } from "shared/hooks/useMessages";
import { MessageListSkeleton } from "../Skeleton/MessageListSkeleton";

export const MessageList = () => {
  const { isFetching } = useMessages();

  const { messages } = useAppSelector((state) => state.chat);

  const formattedMessages = messages.reduce(
    (acc: (IMessage & { avatar?: boolean })[], message) => [
      ...acc,
      {
        ...message,
        avatar: acc[acc.length - 1]?.userId !== message.userId,
      },
    ],
    []
  );

  return isFetching ? (
    <MessageListSkeleton />
  ) : (
    <List sx={styles.list}>
      {formattedMessages.map((message) => (
        <MessageItem key={message.id} data={message} avatar={message.avatar} />
      ))}
    </List>
  );
};
