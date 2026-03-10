import { createAsyncThunk } from "@reduxjs/toolkit";
import { schoolAddressService } from "./services";
import { CreateSchoolAddressDto, UpdateSchoolAddressDto } from "./types";

export const createSchoolAddress = createAsyncThunk(
  "schoolAddress/create",
  async (dto: CreateSchoolAddressDto, { rejectWithValue }) => {
    try {
      const response = await schoolAddressService.create(dto);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal membuat alamat sekolah",
      );
    }
  },
);

export const getAllSchoolAddresses = createAsyncThunk(
  "schoolAddress/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await schoolAddressService.findAll();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil semua alamat",
      );
    }
  },
);

export const getSchoolAddressById = createAsyncThunk(
  "schoolAddress/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await schoolAddressService.findById(id);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Detail alamat tidak ditemukan",
      );
    }
  },
);

export const getSchoolAddressBySchoolId = createAsyncThunk(
  "schoolAddress/fetchBySchool",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await schoolAddressService.findBySchool(schoolId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Alamat sekolah tidak ditemukan",
      );
    }
  },
);

export const updateSchoolAddress = createAsyncThunk(
  "schoolAddress/update",
  async (
    { id, dto }: { id: string; dto: UpdateSchoolAddressDto },
    { rejectWithValue },
  ) => {
    try {
      const response = await schoolAddressService.update(id, dto);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui alamat",
      );
    }
  },
);

export const deleteSchoolAddress = createAsyncThunk(
  "schoolAddress/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await schoolAddressService.remove(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus alamat",
      );
    }
  },
);
