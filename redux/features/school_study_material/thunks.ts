// src/redux/features/study_material/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { studyMaterialService } from './service';
import { CreateStudyMaterialDto, UpdateStudyMaterialDto } from './types';

export const createStudyMaterial = createAsyncThunk(
    'studyMaterial/create',
    async (dto: CreateStudyMaterialDto, { rejectWithValue }) => {
        try {
            const response = await studyMaterialService.create(dto);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal membuat materi');
        }
    }
);

export const fetchMaterialsBySubject = createAsyncThunk(
    'studyMaterial/fetchBySubject',
    async (subjectId: string, { rejectWithValue }) => {
        try {
            const response = await studyMaterialService.findBySubject(subjectId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal memuat materi');
        }
    }
);

export const fetchOneMaterial = createAsyncThunk(
    'studyMaterial/fetchOne',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await studyMaterialService.findOne(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Materi tidak ditemukan');
        }
    }
);

export const updateStudyMaterial = createAsyncThunk(
    'studyMaterial/update',
    async (dto: UpdateStudyMaterialDto, { rejectWithValue }) => {
        try {
            const response = await studyMaterialService.update(dto);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui materi');
        }
    }
);

export const deleteStudyMaterial = createAsyncThunk(
    'studyMaterial/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await studyMaterialService.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Gagal menghapus materi');
        }
    }
);