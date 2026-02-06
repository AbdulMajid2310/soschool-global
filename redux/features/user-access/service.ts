import { api } from "@/lib/axiosInstance";
import { UserAccessResponse, SingleUserAccessResponse, UserAccess } from "./types";

export const fetchAllUserAccess = async (): Promise<UserAccessResponse> => {
  const response = await api.get("/user-access");
  return response.data;
};

export const fetchUserAccessById = async (id: string): Promise<SingleUserAccessResponse> => {
  const response = await api.get(`/user-access/${id}`);
  return response.data;
};

export const createUserAccessApi = async (data: any): Promise<SingleUserAccessResponse> => {
  const response = await api.post("/user-access", data);
  return response.data;
};

export const deleteUserAccessApi = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/user-access/${id}`);
  return response.data;
};