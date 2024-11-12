import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  saveAccessToken,
  saveRefreshToken,
} from "shared/utils/token";
import { AuthResponse } from "../types/types";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: getAccessToken(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      { payload: { accessToken, refreshToken } }: PayloadAction<AuthResponse>
    ) {
      state.token = accessToken;
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
    },
    logout(state) {
      state.token = null;

      deleteAccessToken();
      deleteRefreshToken();
    },
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
