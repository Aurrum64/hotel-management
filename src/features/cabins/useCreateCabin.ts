import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import createEditCabin from "../../services/createEditCabin";

export const useCreateCabin = () => {
    const queryClient = useQueryClient();

    const { mutate: createCabinMutation } = useMutation({
        // TODO
        mutationFn: (data: any) => createEditCabin(data),
        onSuccess: () => {
          toast.success("Succesfully created.");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: () => toast.error("The cabin cannot be created."),
      });

      return { createCabinMutation };
};