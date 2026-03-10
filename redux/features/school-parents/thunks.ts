import { createAsyncThunk } from "@reduxjs/toolkit";
import { parentApiService } from "./services";
import {
  CreateParentByUserIdPayload,
  CreateParentPayload,
  UpdateParentPayload,
} from "./types";

export const fetchParents = createAsyncThunk(
  "parents/fetchAll",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await parentApiService.getAll(schoolId);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memuat data orang tua",
      );
    }
  },
);

export const fetchParentById = createAsyncThunk(
  "parents/fetchById",
  async (
    { schoolId, parentId }: { schoolId: string; parentId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await parentApiService.getById(schoolId, parentId);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memuat detail orang tua",
      );
    }
  },
);

export const createParent = createAsyncThunk(
  "parents/create",
  async (payload: CreateParentPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await parentApiService.create(payload);
      dispatch(fetchParents(payload.schoolId));
      return response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(
        Array.isArray(msg) ? msg[0] : msg || "Gagal membuat data orang tua",
      );
    }
  },
);

export const createParentByUserId = createAsyncThunk(
  "parents/createByUserId",
  async (
    payload: CreateParentByUserIdPayload,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await parentApiService.createByUserId(payload);
      dispatch(fetchParents(payload.schoolId));
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghubungkan user",
      );
    }
  },
);

export const updateParent = createAsyncThunk(
  "parents/update",
  async (
    {
      schoolId,
      parentId,
      payload,
    }: { schoolId: string; parentId: string; payload: UpdateParentPayload },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await parentApiService.update(
        schoolId,
        parentId,
        payload,
      );
      dispatch(fetchParents(schoolId));
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memperbarui data orang tua",
      );
    }
  },
);

export const deleteParent = createAsyncThunk(
  "parents/delete",
  async (
    { schoolId, parentId }: { schoolId: string; parentId: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      await parentApiService.remove(schoolId, parentId);
      dispatch(fetchParents(schoolId));
      return parentId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus data orang tua",
      );
    }
  },
);

export const deleteBulkParents = createAsyncThunk(
  "parents/deleteBulk",
  async (
    { schoolId, userIds }: { schoolId: string; userIds: string[] },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await parentApiService.removeBulk(schoolId, userIds);
      dispatch(fetchParents(schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus data secara massal",
      );
    }
  },
);
