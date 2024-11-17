import { useAppDispatch, useAppSelector } from "app/store/store";
import { useEffect } from "react";
import { useGetUsersQuery } from "shared/api/services/common/channel";
import { setUsers } from "shared/slices/chatSlice/services/chatSlice";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const { channelId } = useAppSelector((state) => state.channel);

  const { data, isLoading, isFetching, isSuccess } = useGetUsersQuery(
    {
      channelId: channelId as number,
    },
    { skip: channelId === null }
  );

  useEffect(() => {
    if (isSuccess && !isFetching) {
      dispatch(setUsers(data));
    }
  }, [data, isSuccess]);

  return { isLoading, isFetching };
};
