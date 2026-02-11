import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeacherState, SchoolTeacher, TeacherStats } from './types';
import {
  fetchTeachers,
  registerTeacher,
  updateTeacherData,
  toggleTeacherStatus,
  fetchTeacherProfile,
  fetchTeacherDetail,
  deleteTeacher
} from './thunk';

const initialState: TeacherState & { currentTeacherProfile: SchoolTeacher | null } = {
  teachers: [],
  stats: { total: 0, active: 0, inactive: 0 },
  currentTeacherProfile: null, // Profile guru yang sedang login
  selectedTeacherId: null,
  loading: false,
  error: null,
  success: false,
};

interface RejectedAction extends Action {
  payload: string;
}

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    resetTeacherStatus: (state) => {
      state.error = null;
      state.success = false;
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Teachers (List & Stats)
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action: PayloadAction<{ teachers: SchoolTeacher[], stats: TeacherStats }>) => {
        state.loading = false;
        state.teachers = action.payload.teachers;
        state.stats = action.payload.stats;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Profile (Data Guru yang login)
      .addCase(fetchTeacherProfile.fulfilled, (state, action: PayloadAction<SchoolTeacher>) => {
        state.loading = false;
        state.currentTeacherProfile = action.payload;
      })

      // Fetch Detail (Satu Guru Spesifik)
      .addCase(fetchTeacherDetail.fulfilled, (state, action: PayloadAction<SchoolTeacher>) => {
        state.loading = false;
        // Opsional: jika ingin menyimpan data detail ke state khusus
      })

      // Matcher untuk Loading State (Semua aksi POST/PATCH/DELETE)
      .addMatcher(
        (action) => action.type.endsWith('/pending') && !action.type.includes('fetchAll'),
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )
      // Matcher untuk Success State
      .addMatcher(
        (action) => [
          registerTeacher.fulfilled.type,
          updateTeacherData.fulfilled.type,
          toggleTeacherStatus.fulfilled.type,
          deleteTeacher.fulfilled.type
        ].includes(action.type),
        (state) => {
          state.loading = false;
          state.success = true;
        }
      )
      // Matcher untuk Error State
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && !action.type.includes('fetchAll'),
        (state, action) => {
          state.loading = false;
          state.error = (action as RejectedAction).payload || 'Terjadi kesalahan';
        }
      );
  }
});

export const {
  resetTeacherStatus,
  selectTeacher,
  clearTeacherSelection,
  logoutTeacher
} = teacherSlice.actions;

export default teacherSlice.reducer;