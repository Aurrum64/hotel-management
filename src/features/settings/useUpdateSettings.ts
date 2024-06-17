import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";

export const useUpdateSetting = () => {
    const queryClient = useQueryClient();

    const { mutate: updateSettingMutation } = useMutation({
        // TODO
        mutationFn: (data: any) => updateSetting(data),
        onSuccess: () => {
          toast.success("Setting updated.");
          // TODO synchronize with the query key, remove hardcode
          queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: () => toast.error("The setting cannot be updated."),
      });

      return { updateSettingMutation };
};