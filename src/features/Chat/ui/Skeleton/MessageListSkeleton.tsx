import { Skeleton, Stack } from "@mui/material";
import React from "react";
import { styles } from "./styles";

export const MessageListSkeleton = () => {
  return (
    <Stack sx={styles.list}>
      {Array.from(Array(5).keys()).map((a) => (
        <React.Fragment key={a}>
          <Stack direction={"row"} spacing={2}>
            <Skeleton
              variant="circular"
              width={56}
              height={56}
              sx={{ minHeight: 56 }}
            />
            <Stack spacing={2} width={"100%"}>
              <Skeleton
                variant="rectangular"
                width={"200px"}
                height={"1rem"}
                sx={{ minHeight: "1.25rem" }}
              />
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"1rem"}
                sx={{ minHeight: "1rem" }}
              />
            </Stack>
          </Stack>
          {Array.from(Array(5).keys()).map((b) => (
            <Skeleton
              key={`${a}${b}`}
              variant="rectangular"
              width={"100%"}
              height={"1rem"}
              sx={{ minHeight: "1rem" }}
            />
          ))}
        </React.Fragment>
      ))}
    </Stack>
  );
};
