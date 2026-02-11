import { createAsyncThunk } from '@reduxjs/toolkit';
import { addressService } from './service';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await addressService.getAll();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal mengambil data');
    }
  }
);

export const createAddress = createAsyncThunk(
  'address/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await addressService.create(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat alamat');
    }
  }
);

export const updateAddress = createAsyncThunk(
  'address/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await addressService.update(id, data);
      return response.data.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui alamat');
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'address/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await addressService.remove(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus alamat');
    }
  }
);

export const fetchAddressByUserId = createAsyncThunk(
  'address/fetchByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await addressService.getByUserId(userId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Alamat user tidak ditemukan');
    }
  }
);

export const fetchAddressBySchoolId = createAsyncThunk(
  'address/fetchBySchoolId',
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await addressService.getBySchoolId(schoolId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Alamat sekolah tidak ditemukan');
    }
  }
);