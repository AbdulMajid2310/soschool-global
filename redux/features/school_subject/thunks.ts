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
      const res = await subjectService.create(payload);
      return res.data;
    } catch (err: any) {
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