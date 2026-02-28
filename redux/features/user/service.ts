import { api } from "@/lib/axiosInstance";
import {
  User,
  UserResponse,
  SingleUserResponse,
  UserStatsResponse
} from "./types";

/**
 * Mengambil data statistik untuk dashboard monitoring
 * Endpoint: GET /api/users/stats/monitoring
 */
export const fetchUserStatsApi = async (): Promise<UserStatsResponse> => {
  const response = await api.get("/users/stats/monitoring");
  return response.data;
};

/**
 * Mengambil semua data user
 */
export const fetchAllUsers = async (): Promise<UserResponse> => {
  const response = await api.get("/users");
  return response.data;
};

export const fetchFilteredUsersApi = async (
  schoolId: string,
  role: 'teacher' | 'student' | 'parent' | 'staff',
  exists: boolean = false
): Promise<UserResponse> => {
  const response = await api.get("/users/available", {
    params: {
      schoolId,
      role,
      exists: String(exists) // Kita kirim sebagai string agar konsisten dengan @Query di NestJS
    }
  });
  return response.data;
};


/**
 * Mengambil data user berdasarkan ID
 */
export const fetchUserById = async (id: string): Promise<SingleUserResponse> => {
  const response = await api.get(`/users/user/${id}`); // Sesuaikan dengan controller @Get('user/:id')
  return response.data;
};

/**
 * Cek user berdasarkan NIK
 */
export const fetchUserByNikApi = async (nik: string): Promise<SingleUserResponse> => {
  const response = await api.get(`/users/nik/${nik}`);
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