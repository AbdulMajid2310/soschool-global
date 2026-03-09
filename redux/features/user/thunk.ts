import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./service";
import { User } from "./types";

export const getUserStats = createAsyncThunk(
  "user/getUserStats",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchUserStatsApi();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data statistik monitoring",
      );
    }
  },
);

export const getFilteredUsers = createAsyncThunk(
  "user/getFilteredUsers",
  async (
    {
      schoolId,
      role,
      exists,
    }: {
      schoolId: string;
      role: "teacher" | "student" | "parent" | "staff";
      exists: boolean;
    },
    { rejectWithValue },
  ) => {
    try {
      return await userService.fetchFilteredUsersApi(schoolId, role, exists);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || `Gagal memfilter data ${role}`,
      );
    }
  },
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchAllUsers();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data user",
      );
    }
  },
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await userService.fetchUserById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil detail user",
      );
    }
  },
);

export const getUserByNik = createAsyncThunk(
  "user/getUserByNik",
  async (nik: string, { rejectWithValue }) => {
    try {
      return await userService.fetchUserByNikApi(nik);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mencari user berdasarkan NIK",
      );
    }
  },
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data: Partial<User>, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.createUserApi(data);
      dispatch(getAllUsers());
      dispatch(getUserStats());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan user baru",
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { id, data }: { id: string; data: Partial<User> },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await userService.updateUserApi(id, data);
      dispatch(getAllUsers());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data user",
      );
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.deleteUserApi(id);
      dispatch(getAllUsers());
      dispatch(getUserStats());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus user",
      );
    }
  },
);
