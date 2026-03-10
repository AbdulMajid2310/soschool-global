import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaffState, SchoolStaff, StaffStats, ImportReport } from "./types";
import {
  fetchStaffs,
  registerStaff,
  updateStaffData,
  toggleStaffStatus,
  deleteStaff,
  deleteBulkStaffs, // Tambahkan thunk baru
  importStaffCsv, // Gunakan nama yang konsisten dengan Thunk
} from "./thunks";

const initialState: StaffState = {
  staffs: [],
  stats: { total: 0, active: 0, inactive: 0 },
  selectedStaffId: null,
  importReport: null,
  loading: false,
  error: null,
  success: false,
};

interface RejectedAction extends Action {
  payload: string;
}

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    resetStaffStatus: (state) => {
      state.error = null;
      state.success = false;
      state.importReport = null;
    },
    selectStaff: (state, action: PayloadAction<string>) => {
      state.selectedStaffId = action.payload;
    },
    clearStaffSelection: (state) => {
      state.selectedStaffId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching All Staffs
      .addCase(fetchStaffs.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchStaffs.fulfilled,
        (
          state,
          action: PayloadAction<{ staffs: SchoolStaff[]; stats: StaffStats }>,
        ) => {
          state.loading = false;
          state.staffs = action.payload.staffs;
          state.stats = action.payload.stats;
        },
      )
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CSV Import
      .addCase(
        importStaffCsv.fulfilled,
        (state, action: PayloadAction<ImportReport>) => {
          state.loading = false;
          state.success = true;
          state.importReport = action.payload;
        },
      )

      // Matcher untuk Loading State (Kecuali FetchAll agar tidak bentrok)
      .addMatcher(
        (action) =>
          action.type.startsWith("staff/") &&
          action.type.endsWith("/pending") &&
          !action.type.includes("fetchAll"),
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        },
      )

      // Matcher untuk Semua Mutasi Sukses
      .addMatcher(
        (action) =>
          [
            registerStaff.fulfilled.type,
            updateStaffData.fulfilled.type,
            toggleStaffStatus.fulfilled.type,
            deleteStaff.fulfilled.type,
            deleteBulkStaffs.fulfilled.type, // Daftarkan di sini
          ].includes(action.type),
        (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        },
      )

      // Matcher untuk Rejected State
      .addMatcher(
        (action) =>
          action.type.startsWith("staff/") &&
          action.type.endsWith("/rejected") &&
          !action.type.includes("fetchAll"),
        (state, action) => {
          state.loading = false;
          state.error =
            (action as RejectedAction).payload ||
            "Terjadi kesalahan pada server";
          state.success = false;
        },
      );
  },
});

export const { resetStaffStatus, selectStaff, clearStaffSelection } =
  staffSlice.actions;
export default staffSlice.reducer;
