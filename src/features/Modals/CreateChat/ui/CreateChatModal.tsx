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
import { ICreateChatModalForm } from "../types/types";
import { InputController } from "shared/ui/form/InputController";
import { useAppDispatch, useAppSelector } from "app/store/store";
import ErrorIcon from "@mui/icons-material/Error";
import { ChatType } from "shared/constants/chats";
import { SelectController } from "shared/ui/form/SelectController";
import { useCreateChatMutation } from "shared/api/services/common/channel";
import { addChat } from "shared/slices/channelSlice/services/channelSlice";

interface CreateChatModalProps {
  modalVisible: boolean;
  toggleModalVisible: () => void;
}

export const CreateChatModal: React.FC<CreateChatModalProps> = ({
  modalVisible,
  toggleModalVisible,
}) => {
  const dispatch = useAppDispatch();

  const { channelId } = useAppSelector((state) => state.channel);

  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm<ICreateChatModalForm>({
    defaultValues: { name: "", type: ChatType.text },
  });

  const [createChat] = useCreateChatMutation();

  const onSubmit = (data: ICreateChatModalForm) => {
    console.log(data);
    if (channelId !== null) {
      createChat({ ...data, channelId })
        .unwrap()
        .then((data) => {
          dispatch(addChat(data));
          toggleModalVisible();
        })
        .catch((err) => {
          setErrorMessage(
            err?.data?.message ? err.data.message : "Не удалось создать чат!"
          );
        });
    }
  };

  return (
    <Dialog open={modalVisible} onClose={toggleModalVisible}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogTitle sx={{ bgcolor: "grey.900" }}>
            Создание сервера
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "grey.900", width: 400 }}>
            <Stack sx={{ paddingTop: 1, gap: 2 }}>
              <InputController
                name={"name"}
                label="Введите название чата"
                placeholder="general"
                sx={{ width: "100%" }}
                required
              />
              <SelectController
                options={[
                  { id: "text", value: "Текстовый" },
                  { id: "voice", value: "Голосовой" },
                ]}
                name={"type"}
                label="Выберите тип чата"
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
