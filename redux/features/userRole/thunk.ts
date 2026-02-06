import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userRoleApi from "./api";

export const getAllUserRoles = createAsyncThunk(
  "userRole/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRoleApi.fetchAllUserRoles();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil data role");
    }
  }
);

export const getUserRoleById = createAsyncThunk(
  "userRole/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userRoleApi.fetchUserRoleById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil detail role");
    }
  }
);