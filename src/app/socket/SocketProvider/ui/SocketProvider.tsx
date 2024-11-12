import { useAppDispatch, useAppSelector } from "app/store/store";
import React, { ReactNode, useEffect } from "react";
import { initSocket } from "shared/api/socket/slice/socketSlice";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { isConnected } = useAppSelector((state) => state.socket);

  useEffect(() => {
    if (!isConnected && token) {
      dispatch(initSocket());
    }
  }, [isConnected, token]);

  return <>{children}</>;
};
