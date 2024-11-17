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
import { ChatType } from "shared/constants/chats";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { setChatId } from "shared/slices/chatSlice/services/chatSlice";
import { useToggle } from "usehooks-ts";
import { ChatItemContextMenu } from "./ChatItemContextMenu";
import { ConfirmationModal } from "features/Modals/Confirmation";
import { useDeleteChatMutation } from "shared/api/services/common/chat";
import { removeChat } from "shared/slices/channelSlice/services/channelSlice";

interface ChatItemProps {
  data: IChat;
}

export const ChatItem: React.FC<ChatItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { chatId } = useAppSelector((state) => state.chat);
  const { chats } = useAppSelector((state) => state.channel);

  const [deleteChatModalVisible, toggleDeleteChatModalVisible] = useToggle();

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [deleteChat] = useDeleteChatMutation();

  const { id, name, type } = data;

  const handleClick = () => {
    if (ChatType.text === type) {
      dispatch(setChatId(id));
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    if (!deleteChatModalVisible) {
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

  const handleConfirmChatDeletion = () => {
    deleteChat({ chatId: id })
      .unwrap()
      .then(() => {
        if (id === chatId) {
          dispatch(setChatId(chats[0]?.id || null));
        }
        toggleDeleteChatModalVisible();
        dispatch(removeChat(id));
      })
      .catch(() => {});
  };

  return (
    <>
      <ListItem onContextMenu={handleContextMenu} disablePadding>
        <ListItemButton onClick={handleClick} selected={chatId === id}>
          <ListItemIcon>
            {type === ChatType.text ? <TextsmsIcon /> : <VolumeUpIcon />}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
      <ChatItemContextMenu
        contextMenu={contextMenu}
        handleClose={handleClose}
        toggleDeleteChatModalVisible={toggleDeleteChatModalVisible}
      />
      <ConfirmationModal
        modalVisible={deleteChatModalVisible}
        toggleModalVisble={toggleDeleteChatModalVisible}
        onConfirm={handleConfirmChatDeletion}
      />
    </>
  );
};
