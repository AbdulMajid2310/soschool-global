import { api } from "@/lib/axiosInstance";
import { User, UserResponse, SingleUserResponse } from "./types";

/**
 * Mengambil semua data user
 */
export const fetchAllUsers = async (): Promise<UserResponse> => {
  const response = await api.get("/users");
  return response.data;
};

/**
 * Mengambil data user berdasarkan ID
 */
export const fetchUserById = async (id: string): Promise<SingleUserResponse> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

/**
 * Menambah user baru
 */
export const createUserApi = async (data: Partial<User>): Promise<SingleUserResponse> => {
  const response = await api.post("/users", data);
  return response.data;
};

/**
 * Memperbarui data user
 */
export const updateUserApi = async (id: string, data: Partial<User>): Promise<SingleUserResponse> => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

/**
 * Menghapus user
 */
export const deleteUserApi = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};