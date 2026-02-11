// src/redux/features/study_material/studyMaterialSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyMaterialState, StudyMaterial } from './types';
import {
    createStudyMaterial,
    fetchMaterialsBySubject,
    fetchOneMaterial,
    updateStudyMaterial,
    deleteStudyMaterial
} from './thunks';

const initialState: StudyMaterialState = {
    materials: [],
    selectedMaterial: null,
    loading: false,
    isSubmitting: false,
    error: null,
};

const studyMaterialSlice = createSlice({
    name: 'studyMaterial',
    initialState,
    reducers: {
        clearSelectedMaterial: (state) => {
            state.selectedMaterial = null;
        },
        clearMaterialError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch List
            .addCase(fetchMaterialsBySubject.pending, (state) => { state.loading = true; })
            .addCase(fetchMaterialsBySubject.fulfilled, (state, action) => {
                state.loading = false;
                state.materials = action.payload;
            })
            .addCase(fetchMaterialsBySubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch One (Detail)
            .addCase(fetchOneMaterial.fulfilled, (state, action) => {
                state.selectedMaterial = action.payload;
            })

            // Create
            .addCase(createStudyMaterial.pending, (state) => { state.isSubmitting = true; })
            .addCase(createStudyMaterial.fulfilled, (state, action) => {
                state.isSubmitting = false;
                state.materials.unshift(action.payload);
            })
            .addCase(createStudyMaterial.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload as string;
            })

            // Update
            .addCase(updateStudyMaterial.pending, (state) => { state.isSubmitting = true; })
            .addCase(updateStudyMaterial.fulfilled, (state, action) => {
                state.isSubmitting = false;
                const index = state.materials.findIndex(m => m.studyMaterialId === action.payload.studyMaterialId);
                if (index !== -1) state.materials[index] = action.payload;
                if (state.selectedMaterial?.studyMaterialId === action.payload.studyMaterialId) {
                    state.selectedMaterial = action.payload;
                }
            })

            // Delete
            .addCase(deleteStudyMaterial.fulfilled, (state, action) => {
                state.materials = state.materials.filter(m => m.studyMaterialId !== action.payload);
            });
    },
});

export const { clearSelectedMaterial, clearMaterialError } = studyMaterialSlice.actions;
export default studyMaterialSlice.reducer;