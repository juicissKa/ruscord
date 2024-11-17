import React from "react";
import { styles } from "./styles";
import { useAppSelector } from "app/store/store";
import { ChannelItem } from "entities/ChannelItem/ui/ChannelItem";
import { List } from "@mui/material";
import { CreateServerButton } from "./CreateServerButton";

export const Sidebar = () => {
  const { channels } = useAppSelector((state) => state.socket.profile);

  return (
    <List sx={styles.list} disablePadding>
      {channels.map((channel) => (
        <ChannelItem key={channel.id} data={channel} />
      ))}
      <CreateServerButton />
    </List>
  );
};
