import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  text: {
    ".MuiListItemText-primary": { overflow: "hidden" },
    ".MuiListItemText-secondary": { overflowWrap: "break-word" },
  },
};
