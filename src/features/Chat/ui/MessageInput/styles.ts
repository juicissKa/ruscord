import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  textField: {
    bgcolor: "grey.900",
    borderRadius: 4,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "transparent", // On hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent", // On focus
      },
    },
  },
};
