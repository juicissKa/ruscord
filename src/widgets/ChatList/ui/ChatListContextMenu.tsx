import { Menu, MenuItem } from "@mui/material";
import React from "react";

interface ChatListContextMenuProps {
  handleClose: () => void;
  contextMenu: {
    mouseX: number;
    mouseY: number;
  } | null;
  toggleCreateChatModalVisible: () => void;
}

export const ChatListContextMenu: React.FC<ChatListContextMenuProps> = ({
  handleClose,
  contextMenu,
  toggleCreateChatModalVisible,
}) => {
  const handleOpenCreateChatModal = () => {
    toggleCreateChatModalVisible();
    handleClose();
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleOpenCreateChatModal}>Создать чат</MenuItem>
    </Menu>
  );
};
