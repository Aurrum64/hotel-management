import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/authApi";

export const useGetUser = () => {
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isFetching, isAuthenticated: user?.role === "authenticated" };
};
