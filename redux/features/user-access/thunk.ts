import { createAsyncThunk } from "@reduxjs/toolkit";
import * as accessService from "./service";
import { AssignBulkRequest } from "./types";

export const getAllUserAccess = createAsyncThunk(
  "userAccess/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await accessService.fetchAllUserAccess();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil daftar akses",
      );
    }
  },
);

export const getUserAccessGrouped = createAsyncThunk(
  "userAccess/getGrouped",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await accessService.fetchUserAccessByUserId(userId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil akses sekolah",
      );
    }
  },
);

export const createBulkAccess = createAsyncThunk(
  "userAccess/createBulk",
  async (data: AssignBulkRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await accessService.createBulkAccessApi(data);
      dispatch(getAllUserAccess());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal membuat akses massal",
      );
    }
  },
);

export const updateUserAccess = createAsyncThunk(
  "userAccess/update",
  async (
    { id, data }: { id: string; data: any },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await accessService.updateUserAccessApi(id, data);
      dispatch(getAllUserAccess());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui akses",
      );
    }
  },
);

export const deleteUserAccess = createAsyncThunk(
  "userAccess/delete",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await accessService.deleteUserAccessApi(id);
      dispatch(getAllUserAccess());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus akses",
      );
    }
  },
);

export const deleteBulkAccess = createAsyncThunk(
  "userAccess/deleteBulk",
  async (payload: AssignBulkRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await accessService.deleteBulkAccessApi(payload);
      dispatch(getAllUserAccess());
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mencabut akses siswa",
      );
    }
  },
);
