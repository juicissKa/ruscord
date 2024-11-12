import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TextsmsIcon from "@mui/icons-material/Textsms";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import React from "react";
import { IChat } from "../types/types";
import { ChatTypes } from "shared/constants/channels";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { setChatId } from "shared/slices/chatSlice/services/chatSlice";

interface ChatItemProps {
  data: IChat;
}

export const ChatItem: React.FC<ChatItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { chatId } = useAppSelector((state) => state.chat);

  const { id, name, type } = data;

  const handleClick = () => {
    if (ChatTypes.text === type) {
      dispatch(setChatId(id));
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} selected={chatId === id}>
        <ListItemIcon>
          {type === ChatTypes.text ? <TextsmsIcon /> : <VolumeUpIcon />}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};
