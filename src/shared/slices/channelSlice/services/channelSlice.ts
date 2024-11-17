import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "entities/ChatItem/types/types";

interface ChannelState {
  channelId: number | null;
  chats: IChat[];
}

const initialState: ChannelState = {
  channelId: null,
  chats: [],
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelId(state, { payload }) {
      state.channelId = payload;
    },
    setChats(state, { payload }) {
      state.chats = payload;
    },
    addChat(state, { payload }) {
      state.chats = [...state.chats, payload];
    },
    removeChat(state, { payload }) {
      state.chats = state.chats.filter(({ id }) => id !== payload);
    },
  },
});

export const { setChannelId, setChats, addChat, removeChat } =
  channelSlice.actions;

export default channelSlice.reducer;
