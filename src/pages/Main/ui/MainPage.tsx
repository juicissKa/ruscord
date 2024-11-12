import { Stack } from "@mui/material";
import React from "react";
import { ChatList } from "widgets/ChatList";
import { ChatChannel } from "widgets/ChatChannel";
import { styles } from "./styles";
import { Loader } from "app/layout/ui/Loader";
import { useChats } from "shared/hooks/useChats";
import { useUsers } from "shared/hooks/useUsers";

export const MainPage = () => {
  const { isFetching: isChatsFetching } = useChats();
  const { isFetching: isUsersFetching } = useUsers();

  return (
    <Stack direction={"row"} style={styles.wrapper}>
      {isChatsFetching || isUsersFetching ? (
        <Loader />
      ) : (
        <>
          <ChatList />
          <ChatChannel />
        </>
      )}
    </Stack>
  );
};
