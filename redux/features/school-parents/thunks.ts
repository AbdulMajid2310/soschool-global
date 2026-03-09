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
        err.response?.data?.message || "Failed to fetch parents",
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
        err.response?.data?.message || "Failed to fetch parent detail",
      );
    }
  },
);

export const createParent = createAsyncThunk(
  "parents/create",
  async (payload: CreateParentPayload, { rejectWithValue }) => {
    try {
      const response = await parentApiService.create(payload);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create parent",
      );
    }
  },
);

export const createParentByUserId = createAsyncThunk(
  "parents/createByUserId",
  async (payload: CreateParentByUserIdPayload, { rejectWithValue }) => {
    try {
      const response = await parentApiService.createByUserId(payload);
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
    { rejectWithValue },
  ) => {
    try {
      const response = await parentApiService.update(
        schoolId,
        parentId,
        payload,
      );
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update parent",
      );
    }
  },
);

export const deleteParent = createAsyncThunk(
  "parents/delete",
  async (
    { schoolId, parentId }: { schoolId: string; parentId: string },
    { rejectWithValue },
  ) => {
    try {
      await parentApiService.remove(schoolId, parentId);
      return parentId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete parent",
      );
    }
  },
);
