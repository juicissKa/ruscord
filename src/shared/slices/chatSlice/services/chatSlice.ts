import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "entities/MessageItem/types/types";
import { IUser } from "entities/UserItem/types/types";
import { uniq } from "lodash";
import { chatService } from "shared/api/services/common/chat";

interface ChatState {
  chatId: number;
  fetchedChats: number[];
  messages: IMessage[];
  users: IUser[];
}

const initialState: ChatState = {
  chatId: 5,
  fetchedChats: [5],
  messages: [],
  users: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId(state, { payload }: PayloadAction<number>) {
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
  extraReducers: (builder) => {
    builder.addMatcher(
      chatService.endpoints.getMessages.matchFulfilled,
      (state, { meta }) => {
        state.fetchedChats = uniq([
          ...state.fetchedChats,
          meta.arg.originalArgs.chatId,
        ]);
      }
    );
  },
});

export const { setChatId, setMessages, addMessage, setUsers } =
  chatSlice.actions;

export default chatSlice.reducer;
