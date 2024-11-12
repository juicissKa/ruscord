import { authSlice } from "shared/slices/authSlice";
import { LoginRequest, RegisterRequest } from "../types/types";
import { authApi } from "shared/api/authApi";
import { AuthResponse } from "shared/slices/authSlice/types/types";

export const authService = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: ({ email, password }) => {
        const body = new URLSearchParams({ email, password });
        return {
          url: "login",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { login } = authSlice.actions;
          dispatch(login(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: ({ email, password, username }) => {
        const body = new URLSearchParams({ email, password, username });
        return {
          url: "register",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { login } = authSlice.actions;
          dispatch(login(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authService;
