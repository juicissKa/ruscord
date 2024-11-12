import { IRequestWithPagination } from "shared/types/request";

export interface IGetMessagesRequest extends IRequestWithPagination {
  chatId: number;
}
