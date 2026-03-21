import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubjectState, Subject } from "./types";
import {
  fetchSubjects,
  fetchSubjectDetail,
  createSubject,
  updateSubject,
  deleteSubject,
  createBulkSubject,
} from "./thunks";

const initialState: SubjectState = {
  subjects: [],
  currentSubject: null,
  loading: false,
  error: null,
  isSubmitting: false,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    selectSubject: (state, action: PayloadAction<Subject | null>) => {
      state.currentSubject = action.payload;
    },
    clearSubjectError: (state) => {
      state.error = null;
    },
    resetSubjectState: (state) => {
      state.subjects = [];
      state.currentSubject = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubjects.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.loading = false;
          state.subjects = action.payload;
        },
      )
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSubjectDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubjectDetail.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.loading = false;
          state.currentSubject = action.payload;
          const index = state.subjects.findIndex(
            (s) => s.subjectId === action.payload.subjectId,
          );
          if (index !== -1) state.subjects[index] = action.payload;
        },
      )
      .addCase(fetchSubjectDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createSubject.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        createSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.isSubmitting = false;
          state.subjects.unshift(action.payload);
        },
      )
      .addCase(createSubject.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })

      .addCase(createBulkSubject.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        createBulkSubject.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.isSubmitting = false;
          state.subjects = [...action.payload, ...state.subjects];
        },
      )
      .addCase(createBulkSubject.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })

      .addCase(updateSubject.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        updateSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.isSubmitting = false;
          const index = state.subjects.findIndex(
            (s) => s.subjectId === action.payload.subjectId,
          );
          if (index !== -1) state.subjects[index] = action.payload;
          if (state.currentSubject?.subjectId === action.payload.subjectId) {
            state.currentSubject = action.payload;
          }
        },
      )
      .addCase(updateSubject.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })

      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteSubject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.subjects = state.subjects.filter(
            (s) => s.subjectId !== action.payload,
          );
          if (state.currentSubject?.subjectId === action.payload) {
            state.currentSubject = null;
          }
        },
      )
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectSubject, clearSubjectError, resetSubjectState } =
  subjectSlice.actions;
export default subjectSlice.reducer;
