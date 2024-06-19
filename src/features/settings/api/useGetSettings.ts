import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";

export const useGetSettings = () => {
    const { data: settings, isFetching: settingsAreFetching } = 
        useQuery({queryKey: ['settings'], queryFn: getSettings});

    return { settings, settingsAreFetching };
};