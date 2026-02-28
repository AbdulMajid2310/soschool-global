import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './service';
import { User } from './types';

/**
 * 1. Ambil Statistik Monitoring User
 * Thunk ini khusus untuk menarik data ringkasan dashboard
 */
export const getUserStats = createAsyncThunk(
  'user/getUserStats',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchUserStatsApi();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal mengambil data statistik monitoring'
      );
    }
  }
);

export const getFilteredUsers = createAsyncThunk(
  'user/getFilteredUsers',
  async (
    { schoolId, role, exists }: { schoolId: string; role: 'teacher' | 'student' | 'parent' | 'staff'; exists: boolean },
    { rejectWithValue }
  ) => {
    try {
      // Memanggil service fetchFilteredUsersApi yang baru saja kita buat
      return await userService.fetchFilteredUsersApi(schoolId, role, exists);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || `Gagal memfilter data ${role}`
      );
    }
  }
);

// 2. Ambil Semua User
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchAllUsers();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal mengambil data user'
      );
    }
  }
);

// 3. Ambil Detail User Berdasarkan ID
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await userService.fetchUserById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal mengambil detail user'
      );
    }
  }
);

// 4. Tambah User Baru
export const createUser = createAsyncThunk(
  'user/createUser',
  async (data: Partial<User>, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.createUserApi(data);
      dispatch(getAllUsers());
      // Opsional: Refresh statistik jika user baru mempengaruhi chart secara signifikan
      dispatch(getUserStats());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menambahkan user baru'
      );
    }
  }
);

// 5. Update Data User
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }: { id: string; data: Partial<User> }, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.updateUserApi(id, data);
      dispatch(getAllUsers());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal memperbarui data user'
      );
    }
  }
);

// 6. Hapus User
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.deleteUserApi(id);
      dispatch(getAllUsers());
      dispatch(getUserStats()); // Refresh stats agar angka total user di dashboard berkurang
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menghapus user'
      );
    }
  }
);