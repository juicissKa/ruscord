import { ChatTypes } from "shared/constants/channels";

export interface IChat {
  id: number;
  name: string;
  type: ChatTypes;
}
