import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentState, Student } from "./types";
import {
  deleteStudent,
  fetchStudents,
  registerStudent,
  updateStudentData,
  deleteBulkStudents,
} from "./thunks";

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  success: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudentStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          state.students = action.payload;
        },
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateStudentData.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateStudentData.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteBulkStudents.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteBulkStudents.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteBulkStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStudentStatus } = studentSlice.actions;
export default studentSlice.reducer;
