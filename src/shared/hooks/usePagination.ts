import { useMemo, useState } from "react";

export const usePagination = (defaultSize = 40, defaultPage = 1) => {
  const [page, setPage] = useState<number>(defaultPage);
  const [size, setSize] = useState<number>(defaultSize);

  return useMemo(
    () => ({ page, size, setPage, setSize }),
    [page, size, setPage, setSize]
  );
};
