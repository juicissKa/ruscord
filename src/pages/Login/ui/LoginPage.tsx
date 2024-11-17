import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { styles } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { InputController } from "shared/ui/form/InputController";
import { EMAIL_PATTERN } from "shared/constants/patterns";
import { useToggle } from "usehooks-ts";
import { ILoginForm } from "../types/types";
import {
  useLoginMutation,
  useRegisterMutation,
} from "shared/api/services/auth/services/authService";
import ErrorIcon from "@mui/icons-material/Error";
import { sha256 } from "js-sha256";
import { useAuth } from "shared/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const { isAuth } = useAuth();

  const [isLogin, toggleLogin] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const isLoading = isRegisterLoading || isLoginLoading;

  const methods = useForm<ILoginForm>({
    defaultValues: { email: "", username: "", password: "" },
  });

  const onSubmit = ({ email, username, password }: ILoginForm) => {
    if (isLogin) {
      login({ email, password: sha256(password) })
        .unwrap()
        .catch((err) => {
          setErrorMessage(
            err?.data?.message ? err.data.message : "Не удалось войти!"
          );
        });
    } else {
      register({ email, username, password: sha256(password) })
        .unwrap()
        .catch((err) => {
          setErrorMessage(
            err?.data?.message
              ? err.data.message
              : "Не удалось зарегистрироваться!"
          );
        });
    }
  };

  const handleSecondaryButtonClick = () => {
    setErrorMessage("");
    toggleLogin();
  };

  if (isAuth) {
    return <Navigate to={"/main"} />;
  }

  return (
    <Box sx={styles.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={2} width={400}>
            <Typography variant="h4">
              {isLogin ? "Авторизация" : "Регистрация"}
            </Typography>
            <InputController
              label="Почта"
              placeholder="example@mail.com"
              name="email"
              type="email"
              rules={{
                required: true,
                minLength: 4,
                maxLength: 32,
              }}
              pattern={EMAIL_PATTERN}
            />
            {!isLogin && (
              <InputController
                label="Логин"
                placeholder="example"
                name="username"
                rules={{ required: true, minLength: 4, maxLength: 32 }}
              />
            )}
            <InputController
              label="Пароль"
              placeholder="password"
              name="password"
              type="password"
              rules={{ required: true, minLength: 6, maxLength: 32 }}
            />
            {!!errorMessage && (
              <Typography color="error">
                <ErrorIcon sx={{ verticalAlign: "bottom" }} /> {errorMessage}
              </Typography>
            )}
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Button
              onClick={handleSecondaryButtonClick}
              variant={isLogin ? "outlined" : "text"}
              disabled={isLoading}
            >
              {isLogin ? "Зарегистрироваться" : "Есть аккаунт?"}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};
