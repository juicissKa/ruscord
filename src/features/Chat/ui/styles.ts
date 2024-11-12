import { SxProps, Theme } from "@mui/material";
import {
  SIDEBAR_WIDTH,
  CHANNEL_LIST_WIDTH,
  USERS_LIST_WIDTH,
} from "shared/constants/sizes";

export const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    justifyContent: "end",
    height: "100%",
    padding: 2,
    width: `calc(100vw - ${SIDEBAR_WIDTH}px - ${CHANNEL_LIST_WIDTH}px - ${USERS_LIST_WIDTH}px
    )`,
  },
};
