import { Stack } from "@mui/material";
import React from "react";
import { ChatList } from "widgets/ChatList";
import { ChatChannel } from "widgets/ChatChannel";
import { styles } from "./styles";
import { Loader } from "app/layout/ui/Loader";
import { useChats } from "shared/hooks/useChats";
import { useUsers } from "shared/hooks/useUsers";
import { useAppSelector } from "app/store/store";
import { NoChannel } from "./NoChannel";

export const MainPage = () => {
  const { channelId } = useAppSelector((state) => state.channel);

  const { isLoading: isChatsFetching } = useChats();
  const { isLoading: isUsersFetching } = useUsers();

  return (
    <Stack direction={"row"} sx={styles.wrapper}>
      {isChatsFetching || isUsersFetching ? (
        <Loader />
      ) : !channelId ? (
        <NoChannel />
      ) : (
        <>
          <ChatList />
          <ChatChannel />
        </>
      )}
    </Stack>
  );
};
