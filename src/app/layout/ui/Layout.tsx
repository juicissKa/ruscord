import { Sidebar } from "widgets/Sidebar";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { styles } from "./styles";
import { useAuth } from "shared/hooks/useAuth";
import { useAppSelector } from "app/store/store";
import { Loader } from "./Loader";

export const Layout = () => {
  const { isAuth } = useAuth();
  const { token } = useAppSelector((state) => state.auth);

  return (
    <>
      <CssBaseline />
      <Box sx={styles.wrapper}>
        {isAuth && <Sidebar />}
        <Box sx={styles.pageWrapper}>
          {isAuth || !token ? <Outlet /> : <Loader />}
        </Box>
      </Box>
      {!isAuth && <Navigate to={"login"} />}
    </>
  );
};
