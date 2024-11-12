import { useGetMessagesQuery } from "shared/api/services/common/chat";
import { useAppDispatch, useAppSelector } from "app/store/store";
import { setMessages } from "shared/slices/chatSlice/services/chatSlice";
import { useEffect } from "react";
import { usePagination } from "./usePagination";

export const useMessages = () => {
  const dispatch = useAppDispatch();

  const { chatId } = useAppSelector((state) => state.chat);

  const { page, size } = usePagination();

  const { data, isLoading, isFetching, isSuccess } = useGetMessagesQuery({
    page,
    size,
    chatId,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setMessages(data));
    }
  }, [data]);

  return { isLoading, isFetching };
};
