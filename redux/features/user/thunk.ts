import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './service';
import { User } from './types';

// 1. Ambil Semua User
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

// 2. Ambil Detail User Berdasarkan ID
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

// 3. Tambah User Baru
export const createUser = createAsyncThunk(
  'user/createUser',
  async (data: Partial<User>, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.createUserApi(data);
      // Refresh list otomatis setelah berhasil tambah
      dispatch(getAllUsers());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menambahkan user baru'
      );
    }
  }
);

// 4. Update Data User
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }: { id: string; data: Partial<User> }, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.updateUserApi(id, data);
      // Refresh list otomatis agar UI terupdate
      dispatch(getAllUsers());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal memperbarui data user'
      );
    }
  }
);

// 5. Hapus User
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.deleteUserApi(id);
      // Refresh list otomatis setelah hapus
      dispatch(getAllUsers());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menghapus user'
      );
    }
  }
);