import { Menu, MenuItem } from "@mui/material";
import React from "react";

interface ChatItemContextMenuProps {
  handleClose: () => void;
  contextMenu: {
    mouseX: number;
    mouseY: number;
  } | null;
  toggleDeleteChatModalVisible: () => void;
}

export const ChatItemContextMenu: React.FC<ChatItemContextMenuProps> = ({
  handleClose,
  contextMenu,
  toggleDeleteChatModalVisible,
}) => {
  const handleOpenDeleteChatModal = () => {
    toggleDeleteChatModalVisible();
    handleClose();
  };

  return (
    <>
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
        <MenuItem onClick={handleOpenDeleteChatModal}>Удалить чат</MenuItem>
      </Menu>
    </>
  );
};
