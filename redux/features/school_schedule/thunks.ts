import { createAsyncThunk } from '@reduxjs/toolkit';
import { scheduleService } from './service';
import { CreateSchedulePayload, UpdateSchedulePayload } from './types';

// 1. Fetch By School (Grouped List)
export const fetchSchedulesBySchool = createAsyncThunk(
    'schedule/fetchBySchool',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getBySchool(schoolId);
            // res.data di sini adalah IGroupedSchedule[] berdasarkan logic findAllBySchool kita tadi
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat jadwal sekolah');
        }
    }
);

// 2. Fetch By Teacher (Grouped List + Summary)
export const fetchSchedulesByTeacher = createAsyncThunk(
    'schedule/fetchByTeacher',
    async (teacherId: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getByTeacher(teacherId);
            /**
             * PERHATIKAN: 
             * res.data di sini berbentuk { summary: ..., schedules: ... }
             * Kita return utuh agar Slice bisa ambil keduanya.
             */
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat jadwal mengajar');
        }
    }
);

// 3. Fetch By Class (Optional Grouped)
export const fetchSchedulesByClass = createAsyncThunk(
    'schedule/fetchByClass',
    async (classroomId: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getByClassroom(classroomId);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat jadwal kelas');
        }
    }
);

// 4. Fetch Detail (Single Flat Data untuk Modal Update)
export const fetchScheduleDetail = createAsyncThunk(
    'schedule/fetchOne',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getOne(id);
            return res.data; // Mengembalikan SchoolSchedule (Flat)
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat detail jadwal');
        }
    }
);

// --- MUTATIONS (CRUD) ---

export const createSchedule = createAsyncThunk(
    'schedule/create',
    async (payload: CreateSchedulePayload, { rejectWithValue }) => {
        try {
            // Log payload yang dikirim (Sangat berguna untuk cek input guru)
            console.log('%c[Schedule Create - Request]:', 'color: #6366f1; font-weight: bold;', payload);

            const res = await scheduleService.create(payload);

            // Log response sukses
            console.log('%c[Schedule Create - Success]:', 'color: #10b981; font-weight: bold;', res.data);

            return res.data;
        } catch (err: any) {
            // Log error detail
            console.error('%c[Schedule Create - Error]:', 'color: #ef4444; font-weight: bold;', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message
            });

            return rejectWithValue(err.response?.data?.message || 'Gagal membuat jadwal');
        }
    }
);

export const updateSchedule = createAsyncThunk(
    'schedule/update',
    async (payload: UpdateSchedulePayload, { rejectWithValue }) => {
        try {
            const res = await scheduleService.update(payload);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memperbarui jadwal');
        }
    }
);

export const deleteSchedule = createAsyncThunk(
    'schedule/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await scheduleService.delete(id);
            return id; // Return ID agar Slice bisa filter array
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal menghapus jadwal');
        }
    }
);