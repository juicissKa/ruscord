import { useAppSelector } from "app/store/store";
import { useMemo } from "react";

export const useAuth = () => {
  const { isConnected } = useAppSelector((state) => state.socket);
  return useMemo(() => ({ isAuth: isConnected }), [isConnected]);
};
