import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { IOption } from "../types/types";

type SelectControllerProps = Omit<
  SelectProps,
  "onChange" | "onBlur" | "value" | "inputRef" | "error"
> & {
  name: string;
  options: IOption[];
};

export const SelectController = ({
  name,
  options,
  ...rest
}: SelectControllerProps) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  return (
    <FormControl>
      {rest.label && <InputLabel id={`label-${name}`}>{rest.label}</InputLabel>}
      <Select
        labelId={rest.label ? `label-${rest.label}` : undefined}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        {...rest}
      >
        {options.map(({ id, value }) => (
          <MenuItem key={id} value={id}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
