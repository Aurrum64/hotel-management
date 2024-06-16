import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

type SettingsProps = {
    id: number;
    created_at: string;
    max_booking_period: number;
    min_booking_period: number;
    breakfast_price: number;
  }

export const useGetSettings = () => {
    const { data: settings } = 
        useQuery({queryKey: ['settigns'], queryFn: getSettings});

    return { settings };
};