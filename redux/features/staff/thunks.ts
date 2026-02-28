import { createAsyncThunk } from '@reduxjs/toolkit';
import { staffService } from './service';
import { CreateStaffPayload } from './types';

export const fetchStaffs = createAsyncThunk(
    'staff/fetchAll',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const response = await staffService.getBySchool(schoolId);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal mengambil data staff');
        }
    }
);

export const registerStaff = createAsyncThunk(
    'staff/register',
    async (payload: CreateStaffPayload, { rejectWithValue, dispatch }) => {
        try {
            const response = await staffService.create(payload);
            dispatch(fetchStaffs(payload.schoolId));
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message;
            return rejectWithValue(Array.isArray(msg) ? msg[0] : msg || 'Gagal mendaftarkan staff');
        }
    }
);

export const updateStaffData = createAsyncThunk(
    'staff/update',
    async (payload: { staffId: string; schoolId: string; data: any }, { rejectWithValue, dispatch }) => {
        try {
            const response = await staffService.update(payload.staffId, payload.data);
            dispatch(fetchStaffs(payload.schoolId));
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal update data staff');
        }
    }
);

export const toggleStaffStatus = createAsyncThunk(
    'staff/toggleStatus',
    async (payload: { staffId: string; schoolId: string; isActive: boolean }, { rejectWithValue, dispatch }) => {
        try {
            const response = await staffService.updateStatus(payload.staffId, payload.isActive);
            dispatch(fetchStaffs(payload.schoolId));
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal merubah status');
        }
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/delete',
    async (payload: { staffId: string; schoolId: string }, { rejectWithValue, dispatch }) => {
        try {
            const response = await staffService.delete(payload.staffId);
            dispatch(fetchStaffs(payload.schoolId));
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal menghapus staff');
        }
    }
);

export const importStaffExcel = createAsyncThunk(
    'staff/importExcel',
    async (payload: { schoolId: string; file: File }, { rejectWithValue, dispatch }) => {
        try {
            const response = await staffService.importExcel(payload.schoolId, payload.file);
            dispatch(fetchStaffs(payload.schoolId));
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Gagal import excel');
        }
    }
);