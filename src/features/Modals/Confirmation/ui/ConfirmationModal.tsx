import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ConfirmationModalProps {
  modalVisible: boolean;
  toggleModalVisble: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  modalVisible,
  toggleModalVisble,
  onConfirm,
}) => {
  return (
    <Dialog open={modalVisible} onClose={toggleModalVisble}>
      <DialogTitle sx={{ bgcolor: "grey.900" }}>
        Подтверждение действия
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "grey.900" }}>
        <DialogContentText>
          Вы действительно хотите удалить чат?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "grey.900" }}>
        <Button onClick={toggleModalVisble} color="error" autoFocus>
          Отмена
        </Button>
        <Button onClick={onConfirm}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};
