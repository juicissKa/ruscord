import { useAppDispatch, useAppSelector } from "app/store/store";
import { useEffect } from "react";
import { useGetChatsQuery } from "shared/api/services/common/channel";
import { setChats } from "shared/slices/channelSlice/services/channelSlice";
import { setChatId } from "shared/slices/chatSlice/services/chatSlice";

export const useChats = () => {
  const dispatch = useAppDispatch();

  const { channelId } = useAppSelector((state) => state.channel);
  const { chatId } = useAppSelector((state) => state.chat);

  const { data, isLoading, isFetching, isSuccess } = useGetChatsQuery(
    {
      channelId: channelId as number,
    },
    { skip: channelId === null }
  );

  useEffect(() => {
    if (isSuccess && !isFetching) {
      dispatch(setChats(data));
      if (chatId === null) dispatch(setChatId(data[0]?.id || null));
    }
  }, [data, isSuccess]);

  return { isLoading, isFetching };
};
