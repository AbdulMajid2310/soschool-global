// src/redux/features/school_schedule/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { scheduleService } from './service';
import { CreateSchedulePayload, UpdateSchedulePayload } from './types';

export const fetchSchedulesBySchool = createAsyncThunk(
    'schedule/fetchBySchool',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getBySchool(schoolId);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat jadwal sekolah');
        }
    }
);

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

export const fetchSchedulesByTeacher = createAsyncThunk(
    'schedule/fetchByTeacher',
    async (teacherId: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getByTeacher(teacherId);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat jadwal mengajar');
        }
    }
);

export const fetchScheduleDetail = createAsyncThunk(
    'schedule/fetchOne',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await scheduleService.getOne(id);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal memuat detail jadwal');
        }
    }
);

// src/redux/features/school_schedule/thunks.ts

export const createSchedule = createAsyncThunk(
    'schedule/create',
    async (payload: CreateSchedulePayload, { rejectWithValue }) => {
        try {
            console.log('📤 [Payload] Mengirim data ke backend:', payload);

            const res = await scheduleService.create(payload);
            console.log('✨ [Backend Response] Berhasil Create:', res.data);


            return res.data; // Data ini yang dikirim ke slice (action.payload)
        } catch (err: any) {
            console.error('❌ [Backend Error] Gagal Create:', err.response?.data);
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
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal menghapus jadwal');
        }
    }
);