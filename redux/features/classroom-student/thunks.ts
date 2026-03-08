import { createAsyncThunk } from "@reduxjs/toolkit";
import { classroomStudentService } from "./services";

export const fetchAllClassroomStudents = createAsyncThunk(
  "classroomStudent/fetchAll",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await classroomStudentService.getAll(schoolId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat semua data siswa");
    }
  }
);

export const fetchStudentsByPeriod = createAsyncThunk(
  "classroomStudent/fetchByPeriod",
  async ({ schoolId, periodId }: { schoolId: string; periodId: string }, { rejectWithValue }) => {
    try {
      const response = await classroomStudentService.getByPeriod(schoolId, periodId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil data siswa periode ini");
    }
  }
);

export const fetchStudentsByConfig = createAsyncThunk(
  "classroomStudent/fetchByConfig",
  async ({ schoolId, configId }: { schoolId: string; configId: string }, { rejectWithValue }) => {
    try {
      const response = await classroomStudentService.getByConfig(schoolId, configId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil data siswa periode ini");
    }
  }
);
export const updateStudentClassStatus = createAsyncThunk(
  "classroomStudent/updateStatus",
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await classroomStudentService.updateStatus(id, status);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memperbarui status siswa");
    }
  }
);

export const promoteStudents = createAsyncThunk(
  "classroomStudent/promote",
  async (mappings: any[], { rejectWithValue }) => {
    try {
      const response = await classroomStudentService.promoteStudents(mappings);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memproses kenaikan kelas");
    }
  }
);

export const graduateStudents = createAsyncThunk(
  "classroomStudent/graduate",
  async ({ studentIds, configId }: { studentIds: string[]; configId: string }, { rejectWithValue }) => {
    try {
      const response = await classroomStudentService.graduateStudents(studentIds, configId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memproses kelulusan");
    }
  }
);