import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  wrapper: { height: "100%" },

  noChannelWrapper: {
    height: "100%",
    width: "100%",

    flexDirection: "column",
    gap: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: 2,
    minWidth: "600px",
  },
  button: {
    width: "50%",
  },
};
