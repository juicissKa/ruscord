import {
  ListItem,
  Tooltip,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { CreateServerModal } from "features/Modals/CreateServer";
import { useToggle } from "usehooks-ts";

export const CreateServerButton = () => {
  const [modalVisible, toggleModalVisible] = useToggle();

  return (
    <>
      <ListItem disablePadding>
        <Tooltip title={"Создать сервер"} placement="right">
          <ListItemButton onClick={toggleModalVisible}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItemButton>
        </Tooltip>
      </ListItem>
      {modalVisible && (
        <CreateServerModal
          modalVisible={modalVisible}
          toggleModalVisible={toggleModalVisible}
        />
      )}
    </>
  );
};
