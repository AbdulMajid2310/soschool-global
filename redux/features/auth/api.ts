import { api } from "@/lib/axiosInstance";
import { ProfileResponseAuth } from "./type";


export const fetchProfileMeApi = async (): Promise<ProfileResponseAuth> => {
  const response = await api.get<ProfileResponseAuth>('/users/profile/me');
  return response.data;
};