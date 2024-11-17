import { IMessage } from "entities/MessageItem/types/types";
import { commonApi } from "shared/api/commonApi";
import { IDeleteChatRequest, IGetMessagesRequest } from "./types/types";

export const chatService = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<IMessage[], IGetMessagesRequest>({
      query: ({ chatId, ...params }) => ({
        method: "GET",
        url: `chats/${chatId}/messages`,
        params,
      }),
    }),
    deleteChat: builder.mutation<void, IDeleteChatRequest>({
      query: ({ chatId }) => ({
        method: "DELETE",
        url: `chats/${chatId}`,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const { useGetMessagesQuery, useDeleteChatMutation } = chatService;
