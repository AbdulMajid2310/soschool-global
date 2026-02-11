import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubjectState, Subject } from './types';
import {
    fetchSubjects,
    fetchSubjectDetail,
    createSubject,
    updateSubject,
    deleteSubject,
} from './thunks';

const initialState: SubjectState = {
    subjects: [],
    currentSubject: null,
    loading: false,
    error: null,
    isSubmitting: false,
};

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        selectSubject: (state, action: PayloadAction<Subject | null>) => {
            state.currentSubject = action.payload;
        },
        clearSubjectError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch All Subjects ---
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
                state.loading = false;
                state.subjects = action.payload;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- Fetch Subject Detail ---
            .addCase(fetchSubjectDetail.fulfilled, (state, action: PayloadAction<Subject>) => {
                state.currentSubject = action.payload;
                // Update juga di list jika ada perubahan data
                const index = state.subjects.findIndex(s => s.subjectId === action.payload.subjectId);
                if (index !== -1) state.subjects[index] = action.payload;
            })

            // --- Create Subject ---
            .addCase(createSubject.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(createSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
                state.isSubmitting = false;
                state.subjects.unshift(action.payload);
                state.error = null;
            })
            .addCase(createSubject.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload as string;
            })

            // --- Update Subject ---
            .addCase(updateSubject.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
                state.isSubmitting = false;
                const index = state.subjects.findIndex(s => s.subjectId === action.payload.subjectId);
                if (index !== -1) {
                    state.subjects[index] = action.payload;
                }
                if (state.currentSubject?.subjectId === action.payload.subjectId) {
                    state.currentSubject = action.payload;
                }
            })

            // --- Delete Subject ---
            .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<string>) => {
                state.subjects = state.subjects.filter(s => s.subjectId !== action.payload);
                if (state.currentSubject?.subjectId === action.payload) {
                    state.currentSubject = null;
                }
            })


    },
});

export const { selectSubject, clearSubjectError } = subjectSlice.actions;
export default subjectSlice.reducer;