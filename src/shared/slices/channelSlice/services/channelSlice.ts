import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "entities/ChatItem/types/types";

interface ChannelState {
  channelId: number;
  chats: IChat[];
}

const initialState: ChannelState = {
  channelId: 3,
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
  },
});

export const { setChannelId, setChats } = channelSlice.actions;

export default channelSlice.reducer;
