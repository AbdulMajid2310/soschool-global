import { createAsyncThunk } from '@reduxjs/toolkit';
import { subjectService } from './service';
import { CreateSubjectPayload, UpdateSubjectPayload } from './types';

export const fetchSubjects = createAsyncThunk(
  'subject/fetchAll',
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const res = await subjectService.getBySchool(schoolId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal memuat mata pelajaran');
    }
  }
);

export const fetchSubjectDetail = createAsyncThunk(
  'subject/fetchOne',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const res = await subjectService.getOne(subjectId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal memuat detail mata pelajaran');
    }
  }
);

export const createSubject = createAsyncThunk(
  'subject/create',
  async (payload: CreateSubjectPayload, { rejectWithValue }) => {
    try {
      console.log('--- [AI Debug] Memulai Create Subject ---');
      console.log('Payload yang dikirim:', payload);

      const res = await subjectService.create(payload);

      // Console log untuk melihat respon sukses dari API
      console.log('✅ [AI Debug] Respon Sukses API:', res);

      // Biasanya formatnya: { success: true, message: "...", data: { ... } }
      // Kita kembalikan data intinya saja ke Redux
      return res.data;

    } catch (err: any) {
      // Console log untuk membongkar error dari API
      console.error('❌ [AI Debug] Respon Error API:');

      if (err.response) {
        // Server merespon dengan status code di luar range 2xx
        console.error('Data Error:', err.response.data);
        console.error('Status Error:', err.response.status);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        // Request dibuat tapi tidak ada respon dari server (Network Error)
        console.error('Request Error (No Response):', err.request);
      } else {
        // Ada kesalahan saat setup request
        console.error('Setup Error:', err.message);
      }

      // Ambil pesan error spesifik dari backend (misal dari NestJS)
      const errorMsg = err.response?.data?.message || 'Gagal membuat mata pelajaran';
      return rejectWithValue(errorMsg);
    }
  }
);

export const updateSubject = createAsyncThunk(
  'subject/update',
  async (payload: UpdateSubjectPayload, { rejectWithValue }) => {
    try {
      const res = await subjectService.update(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal memperbarui data');
    }
  }
);

export const deleteSubject = createAsyncThunk(
  'subject/delete',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      await subjectService.delete(subjectId);
      return subjectId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal menghapus data');
    }
  }
);