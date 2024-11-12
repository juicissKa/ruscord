import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "shared/api/authApi";
import { commonApi } from "shared/api/commonApi";
import { socketMiddleware } from "shared/api/socket/middleware";
import { socketSlice } from "shared/api/socket/slice/socketSlice";
import { authSlice } from "shared/slices/authSlice";
import { channelSlice } from "shared/slices/channelSlice";
import { chatSlice } from "shared/slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    channel: channelSlice.reducer,
    chat: chatSlice.reducer,
    socket: socketSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      commonApi.middleware,
      socketMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
