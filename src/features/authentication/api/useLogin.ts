import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../../../services/authApi";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: () => navigate("/dashboard", { replace: true }),
    onError: () => {
      toast.error("Email or Password are incorrect.");
    },
  });

  return { login, isPending };
};
