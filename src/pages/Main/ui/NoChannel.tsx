import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { useToggle } from "usehooks-ts";
import { CreateServerModal } from "features/Modals/CreateServer";

export const NoChannel = () => {
  const [modalVisible, toggleModalVisible] = useToggle();

  return (
    <>
      <Box sx={styles.noChannelWrapper}>
        <Typography variant="h5" sx={styles.title}>
          Добро пожаловать! <br />
          Присоединяйся к уже существующему серверу, либо создай свой
          собственный!
        </Typography>
        <Stack sx={styles.buttonsWrapper}>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={toggleModalVisible}
          >
            Создать сервер
          </Button>
          <Button variant="outlined" sx={styles.button}>
            Присоединиться к серверу
          </Button>
        </Stack>
      </Box>
      {modalVisible && (
        <CreateServerModal
          modalVisible={modalVisible}
          toggleModalVisible={toggleModalVisible}
        />
      )}
    </>
  );
};
