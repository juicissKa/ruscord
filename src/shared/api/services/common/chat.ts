import { IMessage } from "entities/MessageItem/types/types";
import { commonApi } from "shared/api/commonApi";
import { IGetMessagesRequest } from "./types/types";

export const chatService = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any, any>({
      query: ({ channelId, ...params }) => ({
        url: `channel/${channelId}/chats`,
        params,
      }),
    }),
    getMessages: builder.query<IMessage[], IGetMessagesRequest>({
      query: ({ chatId, ...params }) => ({
        url: `chats/${chatId}/messages`,
        params,
      }),
    }),
    getUsers: builder.query<any, any>({
      query: ({ channelId, ...params }) => ({
        url: `channel/${channelId}/users`,
        params,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useGetUsersQuery, useGetChatsQuery } =
  chatService;
