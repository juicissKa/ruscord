import { ChatType } from "shared/constants/chats";

export interface ICreateChatModalForm {
  name: string;
  type: ChatType;
}
