import { registerSchema } from "../../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useModalStore from "../../../store/modalStore";
import { addUser } from "../../../api/auth";
import type { AuthorizedT, UserT } from "../../../types/auth";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";
import FormField from "../FormField/FormField";
import { Stack } from "../../atoms/Stack/Stack";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { Box } from "../../atoms/Container/Container";
import Button from "../../atoms/Button/Button";
import Modal, { ModalBody, ModalFooter } from "../Modal/Modal";
import SociafyLogo from "../Logo";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

function SignUpModal() {
  const { modalType, close } = useModalStore();
  const closeModal = () => {
    close();
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<UserT> = async (data: UserT) => {
    const token: AuthorizedT = await addUser(data);
    console.log(token);
    if (token) {
      Cookies.set("access_token", token.access_token);
      // nav("/home");
    }
  };

  if (modalType !== "sign-up") {
    return null;
  }

  return (
    <BrowserRouter>
      <Modal onClose={close} size="xl">
        <SociafyLogo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Box padding="lg">
              <Stack justify="center" align="start" gap="md">
                <FormField
                  className="w-full"
                  id="email"
                  variant="primary"
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email")}
                  error={errors.email && errors.email.message}
                />
                <FormField
                  className="w-full"
                  id="username"
                  name="username"
                  type="text"
                  variant="primary"
                  placeholder="Username"
                  {...register("username")}
                  error={errors.username && errors.username.message}
                />
                <FormField
                  className="w-full"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  variant="primary"
                  {...register("password")}
                  error={errors.password && errors.password.message}
                />
                <FormField
                  name="repeatPassword"
                  className="w-full"
                  id="repeatPassword"
                  type="password"
                  variant="primary"
                  placeholder="Repeat Password"
                  {...register("repeatPassword")}
                  error={errors.repeatPassword && errors.repeatPassword.message}
                />
              </Stack>
            </Box>
            <Box className="w-full">
              <Stack direction="row" justify="center" align="center">
                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  id="terms"
                  {...register("terms")}
                />
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                size="lg"
                variant="primary"
                isLoading={isSubmitting}
                type="submit"
                disabled={isSubmitting}
              >
                Sign up
              </Button>
              <Button
                size="lg"
                variant="secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </Modal>
    </BrowserRouter>
  );
}

export default SignUpModal;
