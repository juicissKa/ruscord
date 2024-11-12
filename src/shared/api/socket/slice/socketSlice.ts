// Slice of store that manages Socket connections
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "entities/MessageItem/types/types";
import { IProfile } from "shared/slices/authSlice/types/types";

export interface SocketState {
  profile: IProfile;
  isConnected: boolean;
  socketMessages: IMessage[];
}

const initialState: SocketState = {
  profile: {} as IProfile,
  isConnected: false,
  socketMessages: [],
};

// Now create the slice
export const socketSlice = createSlice({
  name: "socket",
  initialState,
  // Reducers: Functions we can call on the store
  reducers: {
    initSocket: () => {
      return;
    },
    connectionEstablished: (state, { payload }) => {
      state.isConnected = true;
      state.profile = payload;
    },
    // connectionLost: (state) => {
    //   state.isConnected = false;
    // },
    sendMessage: (state, action) => {
      console.log(action);
      return;
    },

    receiveMessage: (state, { payload }: PayloadAction<IMessage>) => {
      state.socketMessages = [...state.socketMessages, payload];
      return;
    },
  },
});

// Don't have to define actions, they are automatically generated
export const {
  initSocket,
  connectionEstablished,
  // connectionLost,
  sendMessage,
  receiveMessage,
} = socketSlice.actions;
