import React from "react";
import { styles } from "./styles";
import { List } from "@mui/material";
import { ChatItem } from "entities/ChatItem";
import { useAppSelector } from "app/store/store";
import { ChatListContextMenu } from "./ChatListContextMenu";
import { useToggle } from "usehooks-ts";
import { CreateChatModal } from "features/Modals/CreateChat";

export const ChatList = () => {
  const { chats } = useAppSelector((state) => state.channel);

  const [createChatModalVisible, toggleCreateChatModalVisible] = useToggle();

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    if (!createChatModalVisible) {
      event.preventDefault();
      event.stopPropagation();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null
      );
    }
  };

  return (
    <List sx={styles.list} onContextMenu={handleContextMenu} disablePadding>
      {chats.map((chat) => (
        <ChatItem key={chat.id} data={chat} />
      ))}
      <ChatListContextMenu
        handleClose={handleClose}
        contextMenu={contextMenu}
        toggleCreateChatModalVisible={toggleCreateChatModalVisible}
      />
      <CreateChatModal
        modalVisible={createChatModalVisible}
        toggleModalVisible={toggleCreateChatModalVisible}
      />
    </List>
  );
};
