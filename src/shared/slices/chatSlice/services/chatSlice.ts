import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "entities/MessageItem/types/types";
import { IUser } from "entities/UserItem/types/types";

interface ChatState {
  chatId: number | null;
  fetchedChats: number[];
  messages: IMessage[];
  users: IUser[];
}

const initialState: ChatState = {
  chatId: null,
  fetchedChats: [5],
  messages: [],
  users: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId(state, { payload }: PayloadAction<number | null>) {
      state.chatId = payload;
    },
    setMessages(state, { payload }: PayloadAction<IMessage[]>) {
      state.messages = payload;
    },
    addMessage(state, { payload }: PayloadAction<IMessage>) {
      state.messages = [...state.messages, payload];
    },
    setUsers(state, { payload }: PayloadAction<IUser[]>) {
      state.users = payload;
    },
  },
});

export const { setChatId, setMessages, addMessage, setUsers } =
  chatSlice.actions;

export default chatSlice.reducer;
