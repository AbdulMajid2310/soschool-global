import { createAsyncThunk } from "@reduxjs/toolkit";
import { scheduleService } from "./service";
import {
  CreateBulkSchedulePayload,
  CreateSchedulePayload,
  UpdateSchedulePayload,
} from "./types";

export const fetchSchedulesBySchool = createAsyncThunk(
  "schedule/fetchBySchool",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const res = await scheduleService.getBySchool(schoolId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memuat jadwal sekolah",
      );
    }
  },
);

export const fetchSchedulesByTeacher = createAsyncThunk(
  "schedule/fetchByTeacher",
  async (
    { teacherId, day }: { teacherId: string; day?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await scheduleService.getByTeacher(teacherId, day);

      return res;
    } catch (err: any) {
      console.error("API ERROR:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Network Protocol Error",
      );
    }
  },
);

export const fetchSpecificScheduleDetail = createAsyncThunk(
  "schedule/fetchSpecificDetail",
  async (
    {
      teacherId,
      subjectId,
      configId,
    }: { teacherId: string; subjectId: string; configId: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await scheduleService.getSpecificSchedule(
        teacherId,
        subjectId,
        configId,
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memuat detail jadwal spesifik",
      );
    }
  },
);

export const fetchSchedulesByClass = createAsyncThunk(
  "schedule/fetchByClass",
  async (classroomId: string, { rejectWithValue }) => {
    try {
      const res = await scheduleService.getByClassroom(classroomId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memuat jadwal kelas",
      );
    }
  },
);

export const fetchScheduleDetail = createAsyncThunk(
  "schedule/fetchOne",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await scheduleService.getOne(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memuat detail jadwal",
      );
    }
  },
);

export const createSchedule = createAsyncThunk(
  "schedule/create",
  async (payload: CreateSchedulePayload, { rejectWithValue }) => {
    try {
      const res = await scheduleService.create(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal membuat jadwal",
      );
    }
  },
);

export const createBulkSchedule = createAsyncThunk(
  "schedule/createBulk",
  async (payload: CreateBulkSchedulePayload, { rejectWithValue }) => {
    try {
      const res = await scheduleService.createBulk(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal membuat banyak jadwal",
      );
    }
  },
);

export const updateSchedule = createAsyncThunk(
  "schedule/update",
  async (payload: UpdateSchedulePayload, { rejectWithValue }) => {
    try {
      const res = await scheduleService.update(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal memperbarui jadwal",
      );
    }
  },
);

export const deleteSchedule = createAsyncThunk(
  "schedule/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await scheduleService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus jadwal",
      );
    }
  },
);
