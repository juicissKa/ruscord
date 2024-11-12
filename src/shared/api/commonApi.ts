import { Mutex } from "async-mutex";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store/store";
import { HTTP_STATUS_UNAUTHORIZED } from "shared/constants/httpStatusCodes";
import { authSlice } from "shared/slices/authSlice";
import { getRefreshToken } from "shared/utils/token";
import { AuthResponse } from "shared/slices/authSlice/types/types";

type BaseQueryFnExtended = (
  args: any,
  api: BaseQueryApi,
  extraOptions: any
) => Promise<any>;

const mutex = new Mutex();

const baseQuery = (args: FetchArgs, api: BaseQueryApi, extraOptions: any) => {
  return fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  })(args, api, extraOptions);
};

const baseQueryWithReAuth: BaseQueryFnExtended = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result?.meta?.response?.status !== 200) {
    result = await baseQuery(
      args,
      api,
      (extraOptions = { ...extraOptions, onlyLocalPriority: true })
    );
  }

  if (result.error && result.error.status === HTTP_STATUS_UNAUTHORIZED) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const { login, logout } = authSlice.actions;
      try {
        const { data } = await baseQuery(
          {
            url: "/refresh",
            method: "POST",
            body: {
              token: getRefreshToken(),
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
          api,
          {}
        );
        if (data) {
          api.dispatch(login(data as AuthResponse));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
