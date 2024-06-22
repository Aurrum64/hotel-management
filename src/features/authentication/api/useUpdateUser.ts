import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  updateUserNameAndAvatar,
  updateUserPassword,
} from "../../../services/authApi";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({
      fullName,
      avatar,
      password,
    }: {
      fullName?: string;
      avatar?: File;
      password?: string;
    }) => password
        ? updateUserPassword(password)
        : updateUserNameAndAvatar(fullName, avatar),
    onSuccess: (user) => {
      toast.success("User account succesfully updated");
      queryClient.setQueryData(["user"], user);;
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  return { updateUser, isPending };
};
