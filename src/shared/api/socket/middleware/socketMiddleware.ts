import { Middleware } from "redux";
// Actions
// Socket Factory
// Types
import { SocketFactory } from "app/socket/SocketFactory";
import { SocketInterface } from "app/socket/SocketFactory/services/SocketFactory";
import {
  connectionEstablished,
  initSocket,
  receiveMessage,
  sendMessage,
} from "../slice/socketSlice";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "shared/utils/token";
import { logout } from "shared/slices/authSlice/services/authSlice";
import axios from "axios";
import { IMessage } from "entities/MessageItem/types/types";
import { setChannelId } from "shared/slices/channelSlice/services/channelSlice";
import { IProfile } from "shared/slices/authSlice/types/types";

enum ConnectError {
  AuthError = "AUTH_ERROR",
}

enum SocketEvent {
  Connect = "connect",
  ConnectionProps = "connection_props",
  Disconnect = "disconnect",
  // Emit events
  SendMessage = "send",
  // On events
  Error = "err",
  Message = "message",
  ConnectError = "connect_error",
  ReceiveMessage = "receive",
}

export const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface;

  return (next) => (action) => {
    if (initSocket.match(action)) {
      if (!socket && typeof window !== "undefined") {
        const accessToken = getAccessToken();
        if (accessToken) {
          socket = SocketFactory.create({ accessToken });

          socket.socket.on(SocketEvent.Connect, () => {});

          socket.socket.on(SocketEvent.ConnectionProps, (profile: IProfile) => {
            store.dispatch(connectionEstablished(profile));
            store.dispatch(setChannelId(profile.channels[0]?.id || null));
          });

          socket.socket.on(SocketEvent.Error, (message) => {
            console.error(message);
          });

          socket.socket.on(SocketEvent.ConnectError, (err) => {
            if (err.message === ConnectError.AuthError) {
              const refreshToken = getRefreshToken();
              if (!refreshToken) {
                store.dispatch(logout());
                return;
              }
              const data = new URLSearchParams({ refreshToken });
              axios({
                url: "http://localhost:3001/refresh",
                method: "post",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data,
              })
                .then((result) => {
                  saveAccessToken(result.data.token);
                  store.dispatch(initSocket());
                })
                .catch(() => {
                  store.dispatch(logout());
                });
            }
          });

          socket.socket.on(SocketEvent.ReceiveMessage, (message: IMessage) => {
            const { fetchedChats } = store.getState().chat;

            if (fetchedChats.includes(message.chatId)) {
              store.dispatch(receiveMessage(message));
            }
          });

          // socket.socket.on(SocketEvent.Disconnect, () => {
          //   store.dispatch(connectionLost());
          // });
        } else {
          store.dispatch(logout());
        }
      }
    }

    if (sendMessage.match(action) && socket) {
      const { chatId } = store.getState().chat;
      const message = action.payload;
      socket.socket.emit(SocketEvent.SendMessage, { chatId, message });
    }

    next(action);
  };
};
