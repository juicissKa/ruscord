import { ChatType } from "shared/constants/chats";
import { IRequestWithPagination } from "shared/types/request";

export interface IGetMessagesRequest extends IRequestWithPagination {
  chatId: number;
}

export interface IGetChatsRequest {
  channelId: number;
}

export interface IGetUsersRequest {
  channelId: number;
}

export interface ICreateChannelRequest {
  name: string;
}

export interface ICreateChatRequest {
  name: string;
  type: ChatType;
  channelId: number;
}

export interface IDeleteChatRequest {
  chatId: number;
}
