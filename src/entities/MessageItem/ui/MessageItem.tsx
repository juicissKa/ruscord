import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { IMessage } from "../types/types";
import { styles } from "./styles";
import { useAppSelector } from "app/store/store";

interface MessageItemProps {
  data: IMessage;
  avatar?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  data,
  avatar = false,
}) => {
  const { users } = useAppSelector((state) => state.chat);

  const { message, userId } = data;

  return (
    <ListItem disablePadding>
      {avatar && (
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          avatar ? users.find(({ id }) => id === userId)?.username : undefined
        }
        secondary={message}
        sx={{ ...styles.text, marginLeft: avatar ? 0 : "56px" }}
      />
    </ListItem>
  );
};
