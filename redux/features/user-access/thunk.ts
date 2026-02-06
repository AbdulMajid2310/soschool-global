import { createAsyncThunk } from '@reduxjs/toolkit';
import * as accessService from './service';

export const getAllUserAccess = createAsyncThunk(
  'userAccess/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await accessService.fetchAllUserAccess();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal mengambil daftar akses');
    }
  }
);

export const createUserAccess = createAsyncThunk(
  'userAccess/create',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await accessService.createUserAccessApi(data);
      dispatch(getAllUserAccess());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat akses baru');
    }
  }
);

export const deleteUserAccess = createAsyncThunk(
  'userAccess/delete',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await accessService.deleteUserAccessApi(id);
      dispatch(getAllUserAccess());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus akses');
    }
  }
);