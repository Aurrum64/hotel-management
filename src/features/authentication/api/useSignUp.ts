import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../../services/authApi";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => signUpApi(fullName, email, password),
    onSuccess: () =>
      toast.success(
        "The account is almost created! A verification message has been sent to the specified email."
      ),
    onError: () => {
      toast.error("Failed to create a new account.");
    },
  });

  return { signUp, isPending };
};
