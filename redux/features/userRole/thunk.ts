import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userRoleApi from "./service";

export const getAllUserRoles = createAsyncThunk(
  "userRole/getAll",
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const response = await userRoleApi.fetchAllUserRoles(search);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data role",
      );
    }
  },
);

export const getUserRoleById = createAsyncThunk(
  "userRole/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userRoleApi.fetchUserRoleById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil detail role",
      );
    }
  },
);

export const getUserRoleByCode = createAsyncThunk(
  "userRole/getByCode",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await userRoleApi.fetchUserRoleByCode(code);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Role tidak ditemukan",
      );
    }
  },
);

export const createUserRole = createAsyncThunk(
  "userRole/create",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await userRoleApi.createUserRoleApi(data);
      dispatch(getAllUserRoles());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal membuat role baru",
      );
    }
  },
);

export const updateUserRole = createAsyncThunk(
  "userRole/update",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await userRoleApi.updateUserRoleApi(id, data);
      dispatch(getAllUserRoles());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui role",
      );
    }
  },
);

export const deleteUserRole = createAsyncThunk(
  "userRole/delete",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userRoleApi.deleteUserRoleApi(id);
      dispatch(getAllUserRoles());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus role",
      );
    }
  },
);
