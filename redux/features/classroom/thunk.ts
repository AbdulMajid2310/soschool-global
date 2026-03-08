import { createAsyncThunk } from "@reduxjs/toolkit";
import { classroomService } from "./service";
import {
  CreateClassroomPayload,
  UpdateClassroomPayload,
  DeleteClassroomPayload,
} from "./types";

export const fetchClassrooms = createAsyncThunk(
  "classroom/fetchAll",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await classroomService.getBySchool(schoolId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil data kelas",
      );
    }
  },
);

export const createClassroom = createAsyncThunk(
  "classroom/add",
  async (payload: CreateClassroomPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await classroomService.create(payload);
      dispatch(fetchClassrooms(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menambah ruangan",
      );
    }
  },
);

export const updateClassroom = createAsyncThunk(
  "classroom/edit",
  async (payload: UpdateClassroomPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await classroomService.update(payload);
      dispatch(fetchClassrooms(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memperbarui ruangan",
      );
    }
  },
);

export const deleteClassroom = createAsyncThunk(
  "classroom/remove",
  async (payload: DeleteClassroomPayload, { rejectWithValue, dispatch }) => {
    try {
      await classroomService.delete(payload.id, payload.schoolId);
      dispatch(fetchClassrooms(payload.schoolId));
      return payload.id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus ruangan",
      );
    }
  },
);
