import { createSlice } from "@reduxjs/toolkit";
import { ClassroomStudentState } from "./types";
import { fetchStudentsByConfig, fetchStudentsByPeriod, updateStudentClassStatus } from "./thunks";

const initialState: ClassroomStudentState = {
  students: [],
  loading: false,
  error: null,
  success: false,
};

const classroomStudentSlice = createSlice({
  name: "classroomStudent",
  initialState,
  reducers: {
    resetStudentStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudentsByPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByPeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Students
      .addCase(fetchStudentsByConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Status
      .addCase(updateStudentClassStatus.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => s.classroomStudentId === action.payload.classroomStudentId
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.success = true;
      });
  },
});

export const { resetStudentStatus } = classroomStudentSlice.actions;
export default classroomStudentSlice.reducer;