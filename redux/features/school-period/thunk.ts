import { createAsyncThunk } from '@reduxjs/toolkit';
import { SchoolPeriodService } from './service';
import { CreateSchoolPeriod, ToggleActivePayload } from './types';

// 1. Ambil semua periode (List)
export const fetchSchoolPeriods = createAsyncThunk(
    'schoolPeriod/fetchAll',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const response = await SchoolPeriodService.getAllBySchool(schoolId);
            return response.data.data; // Mengambil array data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal mengambil data');
        }
    }
);

// 2. Ambil periode yang sedang aktif saja
export const fetchActivePeriod = createAsyncThunk(
    'schoolPeriod/fetchActive',
    async (schoolId: string, { rejectWithValue }) => {
        try {
            const response = await SchoolPeriodService.getActiveBySchool(schoolId);
            return response.data.data;
        } catch (error: any) {
            // Kita tidak selalu ingin menganggap "tidak ada periode aktif" sebagai error merah di console
            return rejectWithValue(error.response?.data?.message || 'Periode aktif tidak ditemukan');
        }
    }
);

// 3. Membuat periode baru
export const createPeriod = createAsyncThunk(
    'schoolPeriod/create',
    async (dto: CreateSchoolPeriod, { rejectWithValue, dispatch }) => {
        try {
            const response = await SchoolPeriodService.create(dto);
            // Auto-refresh list agar UI terupdate
            dispatch(fetchSchoolPeriods(dto.schoolId));
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal membuat periode');
        }
    }
);

// 4. Toggle Status Aktif (Logic paling krusial)
export const togglePeriodStatus = createAsyncThunk(
    'schoolPeriod/toggleStatus',
    async (payload: ToggleActivePayload, { rejectWithValue, dispatch }) => {
        try {
            const response = await SchoolPeriodService.toggleActive(payload);

            // Re-fetch keduanya karena mengubah satu periode menjadi aktif 
            // berpotensi mengubah status periode lain di sekolah yang sama
            dispatch(fetchSchoolPeriods(payload.schoolId));
            dispatch(fetchActivePeriod(payload.schoolId));

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal mengubah status');
        }
    }
);

// 5. Update data periode (Tahun/Semester)
export const updatePeriod = createAsyncThunk(
    'schoolPeriod/update',
    // Menggunakan payload yang lebih terstruktur
    async ({ id, schoolId, dto }: { id: string; schoolId: string; dto: any }, { rejectWithValue, dispatch }) => {
        try {
            const response = await SchoolPeriodService.update(id, dto);
            dispatch(fetchSchoolPeriods(schoolId));

            // Jika yang diupdate kebetulan sedang aktif, update juga state activePeriod
            dispatch(fetchActivePeriod(schoolId));

            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui periode');
        }
    }
);

// 6. Hapus periode
export const deletePeriod = createAsyncThunk(
    'schoolPeriod/delete',
    async ({ id, schoolId }: { id: string, schoolId: string }, { rejectWithValue, dispatch }) => {
        try {
            await SchoolPeriodService.delete(id);
            dispatch(fetchSchoolPeriods(schoolId));
            return id; // Mengembalikan id agar bisa di-filter di slice jika perlu
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal menghapus periode');
        }
    }
);