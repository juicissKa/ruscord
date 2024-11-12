import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { IChannel } from "../types/types";
import { useAppDispatch } from "app/store/store";
import { setChannelId } from "shared/slices/channelSlice/services/channelSlice";

interface ChannelItemProps {
  data: IChannel;
}

export const ChannelItem: React.FC<ChannelItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { id, name } = data;

  const handleClick = () => {
    dispatch(setChannelId(id));
  };

  return (
    <ListItem disablePadding>
      <Tooltip title={name} placement="right">
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};
