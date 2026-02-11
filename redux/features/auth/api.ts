import { api } from "@/lib/axiosInstance";
import { ProfileResponseAuth, LoginResponse, SelectRoleResponse } from "./type";

export const fetchProfileMeApi = async (): Promise<ProfileResponseAuth> => {
  const response = await api.get<ProfileResponseAuth>('/users/profile/me');
  return response.data;
};

export const loginApi = async (formData: any) => {
  const res = await api.post<LoginResponse>('/auth/login', formData);
  return res.data.data; // Mengembalikan { sid }
};

export const selectRoleApi = async (userAccessId: string) => {
  const res = await api.post<SelectRoleResponse>('/auth/select-role', { userAccessId });
  return res.data.data; // Mengembalikan { sid, redirectUrl }
};

export const logoutApi = async () => {
  await api.post('/auth/logout'); // Sesuaikan path-nya jika /logout atau /auth/logout
};