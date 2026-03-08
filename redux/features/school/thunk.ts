import { createAsyncThunk } from "@reduxjs/toolkit";
import schoolService from "./service";
import { CreateSchoolRequest, UpdateSchoolRequest } from "./types";

export const createSchool = createAsyncThunk(
  "school/create",
  async (data: CreateSchoolRequest, { rejectWithValue }) => {
    try {
      return await schoolService.create(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mendaftarkan sekolah",
      );
    }
  },
);

export const fetchSchools = createAsyncThunk(
  "school/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await schoolService.getAll();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data",
      );
    }
  },
);

// di thunk.ts
export const fetchSchoolById = createAsyncThunk(
  "school/fetchById",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      return await schoolService.getById(schoolId);
    } catch (error: any) {
      return rejectWithValue(error || "Gagal mengambil detail sekolah");
    }
  },
);

export const fetchSchoolSummary = createAsyncThunk(
  "school/fetchSchoolSummary",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      return await schoolService.getSummarySchool(schoolId);
    } catch (error: any) {
      return rejectWithValue(error || "Gagal mengambil detail sekolah");
    }
  },
);

// Tambahkan di thunk.ts
export const updateSchool = createAsyncThunk(
  "school/update",
  async (
    { id, data }: { id: string; data: UpdateSchoolRequest },
    { rejectWithValue },
  ) => {
    try {
      return await schoolService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error || "Gagal memperbarui data");
    }
  },
);

export const deleteSchool = createAsyncThunk(
  "school/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await schoolService.delete(id);
      return id; // Kembalikan id untuk dihapus di slice
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data",
      );
    }
  },
);
