// @/redux/features/classroom/slice.ts
import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClassroomState, SchoolClassroom } from './types';
import { createClassroom, deleteClassroom, fetchClassrooms, updateClassroom } from './thunk';

const initialState: ClassroomState = {
  classrooms: [],
  loading: false,
  error: null,
  success: false,
};



const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    resetClassroomStatus: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false; // Pastikan loading juga reset
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Classrooms (Read)
      .addCase(fetchClassrooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassrooms.fulfilled, (state, action: PayloadAction<SchoolClassroom[]>) => {
        state.loading = false;
        state.classrooms = action.payload;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle Success (Create, Update, Delete)
      .addMatcher(
        (action) => [
          createClassroom.fulfilled.type,
          updateClassroom.fulfilled.type, // Tadi ini typo (tulis create 2x)
          deleteClassroom.fulfilled.type
        ].includes(action.type),
        (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        }
      )

      // Handle Loading (Pending)
      .addMatcher(
        (action) => [
          createClassroom.pending.type,
          updateClassroom.pending.type,
          deleteClassroom.pending.type
        ].includes(action.type),
        (state) => {
          state.loading = true;
          state.success = false;
        }
      )

      // Handle Error (Rejected)
      .addMatcher(
        (action) => [
          createClassroom.rejected.type,
          updateClassroom.rejected.type,
          deleteClassroom.rejected.type
        ].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.success = false;
          // Gunakan action.payload, bukan action.type!
          state.error = action.type as string || 'Terjadi kesalahan sistem';
        }
      );
  },
});

export const { resetClassroomStatus } = classroomSlice.actions;
export default classroomSlice.reducer;