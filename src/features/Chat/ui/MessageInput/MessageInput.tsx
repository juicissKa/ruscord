import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useRef } from "react";
import { styles } from "./styles";
import { useAppDispatch } from "app/store/store";
import { sendMessage } from "shared/api/socket/slice/socketSlice";
import { useResizeObserver } from "usehooks-ts";

interface MessageInputProps {
  onResize: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onResize }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver({ ref: wrapperRef, onResize });

  const handleClick = () => {
    const msg = inputRef.current?.value;
    if (msg) {
      dispatch(sendMessage(msg));
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleClick();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <Box ref={wrapperRef} sx={styles.wrapper}>
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
        onKeyDown={handleKeyPress}
        inputRef={inputRef}
      />
    </Box>
  );
};
