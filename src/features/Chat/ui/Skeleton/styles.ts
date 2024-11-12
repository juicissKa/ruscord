import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  list: {
    padding: 2,
    gap: 2,
    direction: "column",
    justifyContent: "flex-end",
    overflow: "auto",
  },
};
