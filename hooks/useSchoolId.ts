import { useAppSelector } from "@/redux/hooks";

export const useSchoolId = () => {
  const { profile } = useAppSelector((state) => state.auth);
  return profile?.activeContext?.schoolId || sessionStorage.getItem("schoolId");
};
