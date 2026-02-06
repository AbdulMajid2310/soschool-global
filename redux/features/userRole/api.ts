
import { api } from "@/lib/axiosInstance";
import { UserRoleResponse, SingleUserRoleResponse } from "./type";

export const fetchAllUserRoles = async (): Promise<UserRoleResponse> => {
  const response = await api.get("/user-roles");
  return response.data;
};

export const fetchUserRoleById = async (id: string): Promise<SingleUserRoleResponse> => {
  const response = await api.get(`/user-roles/${id}`);
  return response.data;
};