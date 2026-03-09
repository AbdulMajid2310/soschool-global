import { api } from "@/lib/axiosInstance";
import {
  User,
  UserResponse,
  SingleUserResponse,
  UserStatsResponse,
} from "./types";

export const fetchUserStatsApi = async (): Promise<UserStatsResponse> => {
  const response = await api.get("/users/stats/monitoring");
  return response.data;
};

export const fetchAllUsers = async (): Promise<UserResponse> => {
  const response = await api.get("/users");
  return response.data;
};

export const fetchFilteredUsersApi = async (
  schoolId: string,
  role: "teacher" | "student" | "parent" | "staff",
  exists: boolean = false,
): Promise<UserResponse> => {
  const response = await api.get("/users/available", {
    params: {
      schoolId,
      role,
      exists: String(exists),
    },
  });
  return response.data;
};

export const fetchUserById = async (
  id: string,
): Promise<SingleUserResponse> => {
  const response = await api.get(`/users/user/${id}`);
  return response.data;
};

export const fetchUserByNikApi = async (
  nik: string,
): Promise<SingleUserResponse> => {
  const response = await api.get(`/users/nik/${nik}`);
  return response.data;
};

export const createUserApi = async (
  data: Partial<User>,
): Promise<SingleUserResponse> => {
  const response = await api.post("/users", data);
  return response.data;
};

export const updateUserApi = async (
  id: string,
  data: Partial<User>,
): Promise<SingleUserResponse> => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUserApi = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
