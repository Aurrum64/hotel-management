import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../../services/authApi";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logout, isPending };
};
