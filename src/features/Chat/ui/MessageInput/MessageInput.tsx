import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useRef } from "react";
import { styles } from "./styles";
import { useAppDispatch } from "app/store/store";
import { sendMessage } from "shared/api/socket/slice/socketSlice";

export const MessageInput = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    const msg = inputRef.current?.value;
    if (msg) {
      dispatch(sendMessage(msg));
    }
  };

  return (
    <TextField
      sx={styles.textField}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      multiline
      placeholder="Введите сообщение..."
      inputRef={inputRef}
    />
  );
};
