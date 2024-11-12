import { config } from "shared/constants/config";
import { io, Socket } from "socket.io-client";

export interface SocketInterface {
  socket: Socket;
}

class SocketConnection implements SocketInterface {
  public socket: Socket;
  public socketEndpoint = config.BACKEND_URL;

  constructor({ accessToken }: { accessToken: string }) {
    this.socket = io(this.socketEndpoint, { auth: { accessToken } });
  }
}

let socketConnection: SocketConnection | undefined;

export class SocketFactory {
  public static create({
    accessToken,
  }: {
    accessToken: string;
  }): SocketConnection {
    if (!socketConnection) {
      socketConnection = new SocketConnection({ accessToken });
    }
    return socketConnection;
  }
}
