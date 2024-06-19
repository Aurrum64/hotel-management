import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";

export const useGetSettings = () => {
    const { data: settings } = 
        useQuery({queryKey: ['settigns'], queryFn: getSettings});

    return { settings };
};