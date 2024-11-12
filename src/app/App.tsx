import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Layout } from "./layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LoginPage, MainPage } from "pages/index";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SocketProvider } from "./socket/SocketProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/main" />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
    errorElement: <Navigate to="main" />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </SocketProvider>
    </Provider>
  );
}

export default App;
