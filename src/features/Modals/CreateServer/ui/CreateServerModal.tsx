import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ICreateServerModalForm } from "../types/types";
import { InputController } from "shared/ui/form/InputController";
import { useCreateChannelMutation } from "shared/api/services/common/channel";
import { useAppDispatch } from "app/store/store";
import { setChannelId } from "shared/slices/channelSlice/services/channelSlice";
import ErrorIcon from "@mui/icons-material/Error";
import { setChatId } from "shared/slices/chatSlice/services/chatSlice";

interface CreateServerModalProps {
  modalVisible: boolean;
  toggleModalVisible: () => void;
}

export const CreateServerModal: React.FC<CreateServerModalProps> = ({
  modalVisible,
  toggleModalVisible,
}) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [createServer] = useCreateChannelMutation();

  const methods = useForm<ICreateServerModalForm>({
    defaultValues: { name: "" },
  });

  const onSubmit = (data: ICreateServerModalForm) => {
    createServer(data)
      .unwrap()
      .then((data) => {
        dispatch(setChannelId(data.id));
        dispatch(setChatId(null));
        toggleModalVisible();
      })
      .catch((err) => {
        setErrorMessage(
          err?.data?.message ? err.data.message : "Не удалось создать сервер"
        );
      });
  };

  return (
    <Dialog open={modalVisible} onClose={toggleModalVisible}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogTitle sx={{ bgcolor: "grey.900" }}>
            Создание сервера
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "grey.900", width: 400 }}>
            <Stack sx={{ paddingTop: 1 }}>
              <InputController
                name={"name"}
                label="Введите название сервера"
                placeholder="Мой сервер"
                sx={{ width: "100%" }}
                required
              />
              {!!errorMessage && (
                <Typography color="error">
                  <ErrorIcon sx={{ verticalAlign: "bottom" }} /> {errorMessage}
                </Typography>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "grey.900" }}>
            <Button onClick={toggleModalVisible}>Отмена</Button>
            <Button type="submit" autoFocus>
              Создать
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
