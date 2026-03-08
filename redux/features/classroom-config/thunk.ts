import { createAsyncThunk } from "@reduxjs/toolkit";
import { classroomConfigService } from "./service";
import {
  CreateClassroomConfigPayload,
  ApiResponse,
  ClassroomConfig,
} from "./types";

export const fetchClassroomConfigs = createAsyncThunk(
  "classroomConfig/fetchAll",
  async (
    { schoolId, periodId }: { schoolId: string; periodId?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await classroomConfigService.getAll(schoolId, periodId);
      const resData = response.data as ApiResponse<ClassroomConfig[]>;
      return resData.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil data konfigurasi",
      );
    }
  },
);

export const fetchClassroomConfigById = createAsyncThunk(
  "classroomConfig/fetchById",
  async (
    { id, schoolId }: { id: string; schoolId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await classroomConfigService.getById(id, schoolId);
      const resData = response.data as ApiResponse<ClassroomConfig>;

      // Logika ini akan mereturn data lengkap beserta relasi:
      // classroom, period, homeroomTeacher.user, dan classroomStudents.student.user
      return resData.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(msg || "Gagal mengambil detail konfigurasi kelas");
    }
  },
);

export const validateClassroomCsv = createAsyncThunk(
  "classroomConfig/validateCsv",
  async (
    { schoolId, file }: { schoolId: string; file: File },
    { rejectWithValue },
  ) => {
    try {
      const response = await classroomConfigService.validateCsv(schoolId, file);
      // response adalah { success: true, message: "...", data: { validStudents: [], invalidNis: [] } }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal validasi CSV",
      );
    }
  },
);

export const registerClassroomConfig = createAsyncThunk(
  "classroomConfig/create",
  async (
    payload: CreateClassroomConfigPayload,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await classroomConfigService.create(payload);
      const resData = response.data as ApiResponse<ClassroomConfig>;
      dispatch(
        fetchClassroomConfigs({
          schoolId: payload.schoolId,
          periodId: payload.periodId,
        }),
      );
      return resData.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(
        Array.isArray(msg) ? msg[0] : msg || "Gagal menyimpan konfigurasi",
      );
    }
  },
);

export const updateClassroomConfig = createAsyncThunk(
  "classroomConfig/update",
  async (
    { id, ...payload }: { id: string } & CreateClassroomConfigPayload,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await classroomConfigService.update(id, payload);
      const resData = response.data as ApiResponse<ClassroomConfig>;
      dispatch(
        fetchClassroomConfigs({
          schoolId: payload.schoolId,
          periodId: payload.periodId,
        }),
      );
      return resData.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(
        Array.isArray(msg) ? msg[0] : msg || "Gagal memperbarui konfigurasi",
      );
    }
  },
);

export const removeClassroomConfig = createAsyncThunk(
  "classroomConfig/delete",
  async (
    {
      id,
      schoolId,
      periodId,
    }: { id: string; schoolId: string; periodId?: string },
    { rejectWithValue },
  ) => {
    try {
      await classroomConfigService.delete(id, schoolId);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus konfigurasi",
      );
    }
  },
);
