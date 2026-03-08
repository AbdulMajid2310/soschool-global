import { createAsyncThunk } from "@reduxjs/toolkit";
import { studentService } from "./service";
import {
  CreateStudentPayload,
  DeleteBulkStudentPayload,
  DeleteStudentPayload,
  UpdateStudentPayload,
} from "./types";

export const fetchStudents = createAsyncThunk(
  "student/fetchBySchool",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await studentService.getBySchool(schoolId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil data siswa",
      );
    }
  },
);

export const registerStudent = createAsyncThunk(
  "student/register",
  async (payload: CreateStudentPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await studentService.create(payload);
      // Refresh list setelah berhasil create
      dispatch(fetchStudents(payload.schoolId));
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(
        Array.isArray(msg) ? msg[0] : msg || "Gagal mendaftarkan siswa",
      );
    }
  },
);

// Thunk Update
export const updateStudentData = createAsyncThunk(
  "student/updateData",
  async (payload: UpdateStudentPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await studentService.update(
        payload.studentId,
        payload.data,
      );
      dispatch(fetchStudents(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal update data siswa",
      );
    }
  },
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (payload: DeleteStudentPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await studentService.delete(
        payload.schoolId,
        payload.studentId,
      );
      dispatch(fetchStudents(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus siswa",
      );
    }
  },
);

export const deleteBulkStudents = createAsyncThunk(
  "student/deleteBulk",
  async (payload: DeleteBulkStudentPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await studentService.deleteBulk(
        payload.schoolId,
        payload.studentIds,
      );
      dispatch(fetchStudents(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus beberapa siswa",
      );
    }
  },
);
