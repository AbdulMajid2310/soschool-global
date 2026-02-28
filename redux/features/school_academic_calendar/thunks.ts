import { createAsyncThunk } from '@reduxjs/toolkit';
import { academicCalendarService } from './service';
import { CreateBulkCalendarPayload, UpdateCalendarPayload } from './types';

export const fetchCalendars = createAsyncThunk(
    'academicCalendar/fetchAll',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            console.log('🚀 [Fetch] Mengambil kalender sekolah:', schoolId);
            const response = await academicCalendarService.getBySchool(schoolId);
            console.log('✅ [Fetch] Data kalender (Grouped):', response.data);
            return response.data; // Ini akan berisi Array [ { month: '...', data: [...] } ]
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil kalender');
        }
    }
);

export const createBulkCalendar = createAsyncThunk(
    'academicCalendar/addBulk',
    async (payload: CreateBulkCalendarPayload, { rejectWithValue, dispatch }) => {
        try {
            console.log('🚀 [Bulk Create] Mengirim data:', payload);
            const response = await academicCalendarService.createBulk(payload);

            // Ambil schoolId dari item pertama di array payload untuk refresh
            const schoolId = payload.calendars[0]?.schoolId;
            if (schoolId) dispatch(fetchCalendars(schoolId));

            console.log('✅ [Bulk Create] Sukses:', response.message);
            return response.data;
        } catch (err: any) {
            console.error('❌ [Bulk Create] Error:', err.response?.data);
            return rejectWithValue(err.response?.data?.message || 'Gagal menambah agenda');
        }
    }
);

export const updateCalendar = createAsyncThunk(
    'academicCalendar/edit',
    async (payload: UpdateCalendarPayload, { rejectWithValue, dispatch }) => {
        try {
            console.log('🚀 [Update] Mengirim update:', payload);

            const response = await academicCalendarService.update(payload);
            console.log('✅ [Update] Respon Server:', response.data);

            // Perbaikan: Pastikan schoolId ada sebelum dispatch fetchCalendars
            if (payload.schoolId) {
                dispatch(fetchCalendars(payload.schoolId));
            } else {
                console.warn('⚠️ [Update] schoolId tidak ditemukan dalam payload, data tidak di-refresh otomatis.');
            }

            return response.data;
        } catch (err: any) {
            console.error('❌ [Update] Error:', {
                message: err.response?.data?.message,
                status: err.response?.status
            });

            return rejectWithValue(err.response?.data?.message || 'Gagal memperbarui agenda');
        }
    }
);

export const deleteCalendar = createAsyncThunk(
    'academicCalendar/remove',
    async (payload: { id: string; schoolId: string }, { rejectWithValue, dispatch }) => {
        try {
            console.log('🚀 [Delete] Menghapus ID:', payload.id);
            await academicCalendarService.delete(payload.id);

            dispatch(fetchCalendars(payload.schoolId));
            console.log('✅ [Delete] Berhasil dihapus');

            return payload.id;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Gagal menghapus agenda';
            console.error('❌ [Delete] Error:', errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);