import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { styles } from "./styles";

export const Loader = () => {
  return (
    <Box sx={{ ...styles.pageWrapper, ...styles.loaderWrapper }}>
      <CircularProgress size={80} />
    </Box>
  );
};
