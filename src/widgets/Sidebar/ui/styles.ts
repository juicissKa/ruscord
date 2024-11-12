import { SxProps, Theme } from "@mui/material";
import { SIDEBAR_WIDTH } from "shared/constants/sizes";

export const styles: Record<string, SxProps<Theme>> = {
  list: { height: "100%", width: SIDEBAR_WIDTH, bgcolor: "grey.900" },
};
