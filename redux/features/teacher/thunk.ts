import { createAsyncThunk } from '@reduxjs/toolkit';
import { teacherService } from './service';
import { CreateTeacherPayload } from './types';

export const fetchTeachers = createAsyncThunk(
  'teacher/fetchAll',
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await teacherService.getBySchool(schoolId);
      return response.data; // Ini berisi { teachers: [], stats: {} }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal mengambil data guru');
    }
  }
);

export const fetchTeacherDetail = createAsyncThunk(
  'teacher/fetchOne',
  async (payload: { schoolId: string; teacherId: string }, { rejectWithValue }) => {
    try {
      const response = await teacherService.getOneBySchool(payload.schoolId, payload.teacherId);
      return response.data; // Mengambil data guru dari successResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal mengambil detail guru');
    }
  }
);

export const fetchTeacherProfile = createAsyncThunk(
  'teacher/fetchProfile',
  async (payload: { schoolId: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await teacherService.getProfile(payload.schoolId, payload.userId);
      return response.data; // Mengembalikan object SchoolTeacher
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal memuat profil pengajar';
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerTeacher = createAsyncThunk(
  'teacher/register',
  async (payload: CreateTeacherPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await teacherService.create(payload);
      dispatch(fetchTeachers(payload.schoolId));
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(Array.isArray(msg) ? msg[0] : msg || 'Gagal mendaftarkan guru');
    }
  }
);

export const updateTeacherData = createAsyncThunk(
  'teacher/update',
  async (payload: { id: string; schoolId: string; data: any }, { rejectWithValue, dispatch }) => {
    try {
      const response = await teacherService.update(payload.schoolId, payload.id, payload.data);
      dispatch(fetchTeachers(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal update data guru');
    }
  }
);

export const toggleTeacherStatus = createAsyncThunk(
  'teacher/toggleStatus',
  async (payload: { teacherId: string; schoolId: string; isActive: boolean }, { rejectWithValue, dispatch }) => {
    try {
      const response = await teacherService.updateStatus(payload.teacherId, payload.isActive);
      dispatch(fetchTeachers(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal merubah status');
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  'teacher/delete',
  async (payload: { schoolId: string; teacherId: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await teacherService.delete(payload.schoolId, payload.teacherId);
      // Refresh list setelah berhasil dihapus
      dispatch(fetchTeachers(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal menghapus data guru');
    }
  }
);