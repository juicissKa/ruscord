import { SxProps, Theme } from "@mui/material";
import { CHANNEL_LIST_WIDTH } from "shared/constants/sizes";

export const styles: Record<string, SxProps<Theme>> = {
  list: { width: CHANNEL_LIST_WIDTH, gap: 0 },
};
