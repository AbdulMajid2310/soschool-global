import { api } from "@/lib/axiosInstance";
import {
  UserRoleResponse,
  SingleUserRoleResponse,
  BulkAccessPayload,
} from "./type";

const BASE_URL = "/user-roles";

export const fetchAllUserRoles = async (
  search?: string,
): Promise<UserRoleResponse> => {
  const response = await api.get(BASE_URL, {
    params: { search },
  });
  return response.data;
};

export const fetchUserRoleById = async (
  id: string,
): Promise<SingleUserRoleResponse> => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const fetchUserRoleByCode = async (
  code: string,
): Promise<SingleUserRoleResponse> => {
  const response = await api.get(`${BASE_URL}/code/${code}`);
  return response.data;
};

export const createUserRoleApi = async (
  data: any,
): Promise<SingleUserRoleResponse> => {
  const response = await api.post(BASE_URL, data);
  return response.data;
};

export const updateUserRoleApi = async (
  id: string,
  data: any,
): Promise<SingleUserRoleResponse> => {
  const response = await api.patch(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteUserRoleApi = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};
