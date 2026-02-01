// src/redux/features/profile/profileThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfileMeApi } from './api';
import { UserProfileData } from './type';

export const getProfileMe = createAsyncThunk<
  UserProfileData, // Tipe data yang di-return saat sukses
  void,            // Argumen (tidak ada)
  { rejectValue: string } // Tipe data saat error
>(
  'profile/getProfileMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProfileMeApi();
      
      // response adalah ProfileResponseAuth { success, message, data }
      // Kita return response.data karena slice butuh UserProfileData
      return response.data; 
    } catch (error: any) {
      // Pastikan mengambil message dari struktur error axios
      const errorMessage = error.response?.data?.message || 'Gagal memuat profil';
      return rejectWithValue(errorMessage);
    }
  }
);