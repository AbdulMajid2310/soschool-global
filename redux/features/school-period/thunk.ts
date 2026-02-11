import { createAsyncThunk } from '@reduxjs/toolkit';
import { SchoolPeriodService } from './service';
import { CreateSchoolPeriod, SchoolPeriod, ToggleActivePayload } from './types';

export const fetchSchoolPeriods = createAsyncThunk(
    'schoolPeriod/fetchAll',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const response = await SchoolPeriodService.getAllBySchool(schoolId);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal mengambil data');
        }
    }
);

export const createPeriod = createAsyncThunk(
    'schoolPeriod/create',
    async (dto: CreateSchoolPeriod, { rejectWithValue, dispatch }) => {
        try {
            const response = await SchoolPeriodService.create(dto);
            // Setelah sukses create, ambil data terbaru
            dispatch(fetchSchoolPeriods(dto.schoolId));
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal membuat periode');
        }
    }
);

export const fetchActivePeriod = createAsyncThunk(
    'schoolPeriod/fetchActive',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const response = await SchoolPeriodService.getActiveBySchool(schoolId);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Periode aktif tidak ditemukan');
        }
    }
);

export const togglePeriodStatus = createAsyncThunk(
    'schoolPeriod/toggleStatus',
    async (payload: ToggleActivePayload, { rejectWithValue, dispatch }) => {
        try {
            const response = await SchoolPeriodService.toggleActive(payload);
            dispatch(fetchSchoolPeriods(payload.schoolId));
            dispatch(fetchActivePeriod(payload.schoolId)); // Update status active global
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal mengubah status');
        }
    }
);


export const updatePeriod = createAsyncThunk(
    'schoolPeriod/update',
    async ({ id, schoolId, dto }: { id: string; schoolId: string; dto: any }, { rejectWithValue, dispatch }) => {
        try {
            const response = await SchoolPeriodService.update(id, dto);
            dispatch(fetchSchoolPeriods(schoolId)); // Refresh list setelah update
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui periode');
        }
    }
);

export const deletePeriod = createAsyncThunk(
    'schoolPeriod/delete',
    async ({ id, schoolId }: ToggleActivePayload, { rejectWithValue, dispatch }) => {
        try {
            await SchoolPeriodService.delete(id);
            dispatch(fetchSchoolPeriods(schoolId));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal menghapus periode');
        }
    }
);