import { createAsyncThunk } from "@reduxjs/toolkit";
import { staffService } from "./service";
import { CreateStaffPayload } from "./types";

export const fetchStaffs = createAsyncThunk(
  "staff/fetchAll",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await staffService.getBySchool(schoolId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil data staff",
      );
    }
  },
);

export const registerStaff = createAsyncThunk(
  "staff/register",
  async (payload: CreateStaffPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await staffService.create(payload);
      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message;
      return rejectWithValue(
        Array.isArray(msg) ? msg[0] : msg || "Gagal mendaftarkan staff",
      );
    }
  },
);

export const registerBulkStaff = createAsyncThunk(
  "staff/registerBulk",
  async (
    payload: { schoolId: string; staffs: any[] },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Console data yang akan dikirim
      console.log("🚀 Mengirim data bulk staff ke server:", {
        schoolId: payload.schoolId,
        totalStaffs: payload.staffs.length,
        data: payload.staffs,
      });

      const response = await staffService.createBulk(
        payload.schoolId,
        payload.staffs,
      );

      // Console respon dari server
      console.log("✅ Respon berhasil dari server:", response.data);

      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      // Console error jika terjadi kegagalan
      console.error("❌ Error saat pendaftaran bulk staff:", {
        message: err.response?.data?.message,
        status: err.response?.status,
        error: err,
      });

      return rejectWithValue(
        err.response?.data?.message || "Gagal mendaftarkan staff secara massal",
      );
    }
  },
);

export const updateStaffData = createAsyncThunk(
  "staff/update",
  async (
    payload: { staffId: string; schoolId: string; data: any },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Perbaikan: Kirim schoolId sesuai requirement service terbaru
      const response = await staffService.update(
        payload.schoolId,
        payload.staffId,
        payload.data,
      );
      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal update data staff",
      );
    }
  },
);

export const toggleStaffStatus = createAsyncThunk(
  "staff/toggleStatus",
  async (
    payload: { staffId: string; schoolId: string; isActive: boolean },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await staffService.updateStatus(
        payload.staffId,
        payload.isActive,
      );
      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal merubah status",
      );
    }
  },
);

export const deleteStaff = createAsyncThunk(
  "staff/delete",
  async (
    payload: { staffId: string; schoolId: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Perbaikan: Kirim schoolId sesuai requirement service terbaru
      const response = await staffService.delete(
        payload.schoolId,
        payload.staffId,
      );
      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal menghapus staff",
      );
    }
  },
);

// Thunk Baru: Hapus Massal Staff
export const deleteBulkStaffs = createAsyncThunk(
  "staff/deleteBulk",
  async (
    payload: { schoolId: string; userIds: string[] },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await staffService.deleteBulk(
        payload.schoolId,
        payload.userIds,
      );
      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Gagal menghapus data staff secara massal",
      );
    }
  },
);

export const importStaffCsv = createAsyncThunk(
  "staff/importCsv",
  async (
    payload: { schoolId: string; file: File },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Perbaikan: Gunakan method importCsv sesuai perubahan di service
      const response = await staffService.importCsv(
        payload.schoolId,
        payload.file,
      );
      dispatch(fetchStaffs(payload.schoolId));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal import data staff",
      );
    }
  },
);
