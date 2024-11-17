import { useGetMessagesQuery } from "shared/api/services/common/chat";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { setMessages } from "shared/slices/chatSlice/services/chatSlice";
import { useEffect } from "react";
import { usePagination } from "./usePagination";

export const useMessages = () => {
  const dispatch = useAppDispatch();

  const { chatId } = useAppSelector((state) => state.chat);
  const { socketMessages } = useAppSelector((state) => state.socket);

  const { page, size } = usePagination();

  const { data, isLoading, isFetching, isSuccess } = useGetMessagesQuery(
    {
      page,
      size,
      chatId: chatId as number,
    },
    { skip: chatId === null }
  );

  useEffect(() => {
    if (chatId === null) {
      dispatch(setMessages([]));
      return;
    }

    if (isSuccess && !isFetching) {
      dispatch(
        setMessages([
          ...data,
          ...socketMessages.filter((message) => message.chatId === chatId),
        ])
      );
    }
  }, [data, isSuccess, socketMessages, chatId]);

  return { isLoading, isFetching };
};
