import { List } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";
import { IMessage } from "entities/MessageItem/types/types";
import { MessageItem } from "entities/MessageItem";
import { useAppSelector } from "app/store/store";
import { useMessages } from "shared/hooks/useMessages";
import "./anchorStyles.css";

interface MessageListProps {
  getListRef: (ref: HTMLUListElement | null) => void;
  scrollToBottom: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  getListRef,
  scrollToBottom,
}) => {
  const { isFetching } = useMessages();

  const firstRender = useRef(true);

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

  useEffect(() => {
    if (messages.length && firstRender) {
      scrollToBottom();
      firstRender.current = false;
    }
  }, [messages]);

  return (
    <List
      id={"scroller"}
      sx={styles.list}
      ref={(ref) => {
        getListRef(ref);
      }}
    >
      {!isFetching &&
        formattedMessages.map((message) => (
          <MessageItem
            key={message.id}
            data={message}
            avatar={message.avatar}
          />
        ))}
      <div id="anchor"></div>
    </List>
  );
};
