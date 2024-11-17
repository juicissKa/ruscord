import { commonApi } from "shared/api/commonApi";
import {
  ICreateChannelRequest,
  ICreateChatRequest,
  IGetChatsRequest,
  IGetUsersRequest,
} from "./types/types";
import { IChannel } from "entities/ChannelItem/types/types";
import { IChat } from "entities/ChatItem/types/types";
import { IUser } from "entities/UserItem/types/types";

export const channelService = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    createChannel: builder.mutation<IChannel, ICreateChannelRequest>({
      query: (params) => ({
        method: "POST",
        url: `channel`,
        params,
      }),
    }),
    createChat: builder.mutation<IChat, ICreateChatRequest>({
      query: ({ channelId, ...params }) => ({
        method: "POST",
        url: `channel/${channelId}/chats`,
        params,
      }),
      invalidatesTags: ["Chat"],
    }),
    getChats: builder.query<IChat[], IGetChatsRequest>({
      query: ({ channelId, ...params }) => ({
        method: "GET",
        url: `channel/${channelId}/chats`,
        params,
      }),
      providesTags: ["Chat"],
    }),
    getUsers: builder.query<IUser[], IGetUsersRequest>({
      query: ({ channelId, ...params }) => ({
        method: "GET",
        url: `channel/${channelId}/users`,
        params,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetChatsQuery,
  useCreateChannelMutation,
  useCreateChatMutation,
} = channelService;
