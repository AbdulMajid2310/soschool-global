import { createSlice } from "@reduxjs/toolkit";
import { AiState } from "./types";
import { fetchAiMaterialDescription, fetchAiSubjectSummary } from "./thunk";

const initialState: AiState = {
  materialDescription: null,
  subjectSummary: null,
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearAiState: (state) => {
      state.materialDescription = null;
      state.subjectSummary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate Material Description
      .addCase(fetchAiMaterialDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAiMaterialDescription.fulfilled, (state, action) => {
        state.loading = false;
        state.materialDescription = action.payload;
      })
      .addCase(fetchAiMaterialDescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Generate Subject Summary
      .addCase(fetchAiSubjectSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAiSubjectSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectSummary = action.payload;
      })
      .addCase(fetchAiSubjectSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAiState } = aiSlice.actions;
export default aiSlice.reducer;
