import { createAsyncThunk } from '@reduxjs/toolkit';
import { aiService } from './service';
import { GenerateMaterialRequest, GenerateSubjectRequest } from './types';

export const fetchAiMaterialDescription = createAsyncThunk(
  'ai/generateMaterial',
  async (data: GenerateMaterialRequest, { rejectWithValue }) => {
    try {
      const response = await aiService.generateMaterial(data);
      return response.data.description; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal generate deskripsi');
    }
  }
);

export const fetchAiSubjectSummary = createAsyncThunk(
  'ai/generateSubject',
  async (data: GenerateSubjectRequest, { rejectWithValue }) => {
    try {
      const response = await aiService.generateSubject(data);
      // Sesuai JSON kamu: { success: true, summary: "..." }
      return response.data.summary; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal generate ringkasan');
    }
  }
);