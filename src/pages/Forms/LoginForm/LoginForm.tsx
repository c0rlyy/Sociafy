import loginCSSModule from "../LoginForm/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../../api/auth";
import { loginSchema } from "../../../schemas/schemas";
import useModalStore from "../../../store/modalStore";
import toast from "react-hot-toast";
import type { UserT } from "../../../types/auth";
import { useAuthStore } from "../../../store/auth-store.";
import FormField from "../../../Components/molecules/FormField/FormField";
import { GridItem } from "../../../Components/atoms/GridItem/GridItem";
import { Stack } from "../../../Components/atoms/Stack/Stack";
import Button from "../../../Components/atoms/Button/Button";
import { Image } from "../../../Components/atoms/Image/Image";
import { Box } from "../../../Components/atoms/Container/Container";
import { useMediaQuery } from "react-responsive";
import SociafyLogo from "../../../Components/molecules/Logo";
import ButtonGroup from "../../../Components/molecules/ButtonGroup/ButtonGroup";

type loginFormScreen = {
  mdScreen: boolean;
};
const LoginForm: React.FC<loginFormScreen> = () => {
  const isMobile = useMediaQuery({
    maxWidth: "768px",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { setToken, getUser, user } = useAuthStore();
  const navigation = useNavigate();
  const { open } = useModalStore();
  const onSubmit = async (data: UserT) => {
    const token = await login(data);
    if (token) {
      setToken(token.access_token);
      toast.success("Successfully Authorized");
      await getUser();
      console.log(user);
      navigation("/home");
    }
  };
  return (
    <GridItem colStart={isMobile ? 1 : 2} colEnd={3}>
      <Stack direction="col" justify="center" align="center">
        <SociafyLogo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="col" justify="center" align="center" gap="lg">
            <FormField
              {...register("username")}
              name="username"
              id="user-name"
              variant="primary"
              placeholder="Enter username"
              label="Username"
              error={errors.username && errors.username.message}
            />

            <FormField
              {...register("password")}
              name="password"
              type="password"
              placeholder="Enter password"
              label="Password"
              error={errors.password && errors.password.message}
            />
            <ButtonGroup>
              <Button
                size="lg"
                variant="primary"
                type="submit"
                value={"Sign In"}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                size="lg"
                type="button"
                value={"Sign Up"}
                onClick={() => open("sign-up")}
              >
                Sign Up
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Stack>
    </GridItem>
  );
};

export default LoginForm;
