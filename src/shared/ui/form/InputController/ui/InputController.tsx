import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";

type InputControllerProps = Omit<
  TextFieldProps,
  "onChange" | "onBlur" | "value" | "inputRef" | "error"
> & {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  pattern?: string;
};

export const InputController = ({
  name,
  rules,
  pattern,
  ...rest
}: InputControllerProps) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    rules: { ...rules, pattern: pattern ? new RegExp(pattern) : undefined },
  });

  return (
    <TextField
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
      slotProps={{
        htmlInput: {
          minLength: rules?.minLength,
          maxLength: rules?.maxLength,
          required: rules?.required,
          pattern,
        },
        inputLabel: {
          shrink: true,
        },
      }}
      autoComplete="off"
      {...rest}
    />
  );
};
