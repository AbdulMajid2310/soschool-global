import { createAsyncThunk } from '@reduxjs/toolkit';
import { classroomService } from './service';
import { CreateClassroomPayload, UpdateClassroomPayload, DeleteClassroomPayload } from './types';

export const fetchClassrooms = createAsyncThunk(
  'classroom/fetchAll',
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await classroomService.getBySchool(schoolId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal mengambil data kelas');
    }
  }
);

export const createClassroom = createAsyncThunk(
  'classroom/add',
  async (payload: CreateClassroomPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await classroomService.create(payload);
      dispatch(fetchClassrooms(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal menambah ruangan');
    }
  }
);

export const updateClassroom = createAsyncThunk(
  'classroom/edit',
  async (payload: UpdateClassroomPayload, { rejectWithValue, dispatch }) => {
    try {
      // 1. Log payload yang dikirim (Cek apakah major & schoolId sudah benar)
      console.log('🚀 Mengirim Update Classroom:', payload);

      const response = await classroomService.update(payload);

      // 2. Log respon dari server (Cek struktur data yang balik dari NestJS)
      console.log('✅ Respon Server (Update Success):', response.data);

      dispatch(fetchClassrooms(payload.schoolId));

      return response.data;
    } catch (err: any) {
      // 3. Log error detail (Penting kalau ada validasi backend yang gagal)
      console.error('❌ Update Classroom Error:', {
        message: err.response?.data?.message,
        status: err.response?.status,
        data: err.response?.data
      });

      return rejectWithValue(err.response?.data?.message || 'Gagal memperbarui ruangan');
    }
  }
);

export const deleteClassroom = createAsyncThunk(
  'classroom/remove',
  async (payload: DeleteClassroomPayload, { rejectWithValue, dispatch }) => {
    try {
      // 1. Panggil service delete
      const response = await classroomService.delete(payload.id, payload.schoolId);

      // 2. Refresh list agar data di UI sinkron dengan DB
      dispatch(fetchClassrooms(payload.schoolId));

      // 3. Return ID agar slice bisa menghapus data dari state (jika perlu)
      // Atau bisa return response.data.message jika ingin ambil pesan sukses dari server
      return payload.id;

    } catch (err: any) {
      // 4. Ambil pesan spesifik dari backend (misal: "Ruangan sedang digunakan...")
      const errorMessage = err.response?.data?.message || 'Gagal menghapus ruangan';

      // Tampilkan di console untuk memudahkan Majid debugging
      console.error('❌ Delete Error:', errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);