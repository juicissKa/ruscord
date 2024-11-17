import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { IChannel } from "../types/types";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { setChannelId } from "shared/slices/channelSlice/services/channelSlice";
import { setChatId } from "shared/slices/chatSlice/services/chatSlice";

interface ChannelItemProps {
  data: IChannel;
}

export const ChannelItem: React.FC<ChannelItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const { channelId } = useAppSelector((state) => state.channel);

  const { id, name } = data;

  const handleClick = () => {
    dispatch(setChannelId(id));
    dispatch(setChatId(null));
  };

  return (
    <ListItem disablePadding>
      <Tooltip title={name} placement="right">
        <ListItemButton onClick={handleClick} selected={channelId === data.id}>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};
