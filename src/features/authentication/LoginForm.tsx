import Form from "../../ui/generalized-form";
import { useLogin } from "./api/useLogin";

function LoginForm() {
  const { login, isPending } = useLogin();

  return (
    <Form
      onFormSubmit={login}
      loading={isPending}
      controls={[
        {
          id: "email",
          label: "Email address",
          autoComplete: "username",
          type: "email",
        },
        {
          id: "password",
          label: "Password",
          autoComplete: "current-password",
          type: "password",
        },
      ]}
    />
  );
}

export default LoginForm;
