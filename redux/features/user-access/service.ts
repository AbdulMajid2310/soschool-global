import { api } from "@/lib/axiosInstance";
import {
  UserAccessResponse,
  SingleUserAccessResponse,
  AssignBulkRequest,
  GroupedUserAccessResponse, // Pastikan ditambahkan di types.ts
} from "./types";

export const fetchAllUserAccess = async (): Promise<UserAccessResponse> => {
  const response = await api.get("/user-access");
  return response.data;
};

export const fetchUserAccessById = async (
  id: string,
): Promise<SingleUserAccessResponse> => {
  const response = await api.get(`/user-access/${id}`);
  return response.data;
};

export const fetchUserAccessByUserId = async (
  userId: string,
): Promise<GroupedUserAccessResponse> => {
  const response = await api.get(`/user-access/user/${userId}`);
  return response.data;
};

export const fetchActiveAccessContext = async (
  userAccessId: string,
): Promise<SingleUserAccessResponse> => {
  const response = await api.get(`/user-access/active/${userAccessId}`);
  return response.data;
};

export const createUserAccessApi = async (
  data: any,
): Promise<SingleUserAccessResponse> => {
  const response = await api.post("/user-access", data);
  return response.data;
};

export const createBulkAccessApi = async (
  data: AssignBulkRequest,
): Promise<UserAccessResponse> => {
  const response = await api.post("/user-access/bulk-access", data);
  return response.data;
};

export const updateUserAccessApi = async (
  id: string,
  data: any,
): Promise<SingleUserAccessResponse> => {
  const response = await api.patch(`/user-access/${id}`, data);
  return response.data;
};

export const deleteUserAccessApi = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/user-access/${id}`);
  return response.data;
};

export const deleteBulkAccessApi = async (data: AssignBulkRequest) => {
  const response = await api.delete(`/user-access/bulk-remove`, { data });
  return response.data;
};
