import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TeacherState,
  SchoolTeacher,
  TeacherStats,
  ImportReport,
} from "./types";
import {
  fetchTeachers,
  registerTeacher,
  updateTeacherData,
  toggleTeacherStatus,
  fetchTeacherProfile,
  fetchTeacherDetail,
  deleteTeacher,
  deleteBulkTeachers, // Tambahkan thunk baru
  importTeacherCsv,
} from "./thunk";

const initialState: TeacherState & {
  currentTeacherProfile: SchoolTeacher | null;
} = {
  teachers: [],
  stats: { total: 0, active: 0, inactive: 0 },
  importReport: null,
  currentTeacherProfile: null,
  selectedTeacherId: null,
  loading: false,
  error: null,
  success: false,
};

interface RejectedAction extends Action {
  payload: string;
}

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    resetTeacherStatus: (state) => {
      state.error = null;
      state.success = false;
      state.importReport = null;
    },
    selectTeacher: (state, action: PayloadAction<string>) => {
      state.selectedTeacherId = action.payload;
    },
    clearTeacherSelection: (state) => {
      state.selectedTeacherId = null;
      state.error = null;
    },
    logoutTeacher: (state) => {
      state.currentTeacherProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching All Teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTeachers.fulfilled,
        (
          state,
          action: PayloadAction<{
            teachers: SchoolTeacher[];
            stats: TeacherStats;
          }>,
        ) => {
          state.loading = false;
          state.teachers = action.payload.teachers;
          state.stats = action.payload.stats;
        },
      )
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Profiling & Details
      .addCase(
        fetchTeacherProfile.fulfilled,
        (state, action: PayloadAction<SchoolTeacher>) => {
          state.loading = false;
          state.currentTeacherProfile = action.payload;
        },
      )
      .addCase(fetchTeacherDetail.fulfilled, (state) => {
        state.loading = false;
      })

      // CSV Import
      .addCase(
        importTeacherCsv.fulfilled,
        (state, action: PayloadAction<ImportReport>) => {
          state.loading = false;
          state.success = true;
          state.importReport = action.payload;
        },
      )

      // Global Matcher untuk Status 'Pending' (Kecuali FetchAll agar tidak double loading)
      .addMatcher(
        (action) =>
          action.type.startsWith("teacher/") &&
          action.type.endsWith("/pending") &&
          !action.type.includes("fetchAll"),
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        },
      )

      // Global Matcher untuk Semua Mutasi Sukses (Create, Update, Delete, Toggle, Bulk)
      .addMatcher(
        (action) =>
          [
            registerTeacher.fulfilled.type,
            updateTeacherData.fulfilled.type,
            toggleTeacherStatus.fulfilled.type,
            deleteTeacher.fulfilled.type,
            deleteBulkTeachers.fulfilled.type, // Daftarkan bulk delete di sini
          ].includes(action.type),
        (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        },
      )

      // Global Matcher untuk Status 'Rejected'
      .addMatcher(
        (action) =>
          action.type.startsWith("teacher/") &&
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

export const {
  resetTeacherStatus,
  selectTeacher,
  clearTeacherSelection,
  logoutTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;
