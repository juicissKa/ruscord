import { useAppDispatch, useAppSelector } from "app/store/store";
import { useEffect } from "react";
import { useGetChatsQuery } from "shared/api/services/common/chat";
import { setChats } from "shared/slices/channelSlice/services/channelSlice";

export const useChats = () => {
  const dispatch = useAppDispatch();

  const { channelId } = useAppSelector((state) => state.channel);

  const { data, isLoading, isFetching, isSuccess } = useGetChatsQuery({
    channelId,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setChats(data));
    }
  }, [data, dispatch]);

  return { isLoading, isFetching };
};
