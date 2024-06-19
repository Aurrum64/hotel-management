import toast from "react-hot-toast";
import deleteCabin from "../../../services/deleteCabin";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteCabin = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteCabinMutation } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
          toast.success("Succesfully deleted.");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: () => toast.error("The cabin cannot be deleted."),
      });
      return { deleteCabinMutation };
};