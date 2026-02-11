import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentState, Student } from './types';
import { deleteStudent, fetchStudents, registerStudent, updateStudentData } from './thunks';

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  success: false,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetStudentStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register Student
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerStudent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ... di dalam extraReducers studentSlice ...

// Update Student Data
.addCase(updateStudentData.pending, (state) => {
  state.loading = true;
})
.addCase(updateStudentData.fulfilled, (state) => {
  state.loading = false;
  state.success = true;
})
.addCase(updateStudentData.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

// Delete Student
.addCase(deleteStudent.pending, (state) => {
  state.loading = true;
})
.addCase(deleteStudent.fulfilled, (state) => {
  state.loading = false;
  state.success = true;
})
.addCase(deleteStudent.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
});
  },
});

export const { resetStudentStatus } = studentSlice.actions;
export default studentSlice.reducer;