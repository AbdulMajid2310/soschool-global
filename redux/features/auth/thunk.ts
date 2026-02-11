
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfileMeApi, logoutApi } from './api';
import { UserProfileData } from './type';

export const getProfileMe = createAsyncThunk<UserProfileData, void, { rejectValue: string }>(
  'profile/getProfileMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProfileMeApi();
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat profil');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'profile/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('sid'); // Bersihkan storage
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal logout');
    }
  }
);