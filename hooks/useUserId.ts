import { useAppSelector } from "@/redux/hooks";

export const useUserId = () => {
  const { profile } = useAppSelector((state) => state.auth);
  return profile?.user.userId || sessionStorage.getItem("userId");
};
