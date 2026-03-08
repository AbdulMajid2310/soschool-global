import { createSlice } from "@reduxjs/toolkit";
import {
  fetchClassroomConfigById,
  fetchClassroomConfigs,
  registerClassroomConfig,
  removeClassroomConfig,
  updateClassroomConfig,
  validateClassroomCsv,
} from "./thunk";
import { ClassroomConfig, StudentVaildation } from "./types";

interface ClassroomConfigState {
  configs: ClassroomConfig[];
  detail: ClassroomConfig | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  csvValidation: {
    validStudents: StudentVaildation[];
    invalidNis: string[];
    loading: boolean;
  };
}

const initialState: ClassroomConfigState = {
  configs: [],
  detail: null,
  loading: false,
  success: false,
  error: null,
  csvValidation: {
    validStudents: [],
    invalidNis: [],
    loading: false,
  },
};

const classroomConfigSlice = createSlice({
  name: "classroomConfig",
  initialState,
  reducers: {
    resetConfigStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassroomConfigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassroomConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.configs = action.payload;
      })

      .addCase(fetchClassroomConfigById.pending, (state) => {
        state.loading = true;
        state.detail = null; // Bersihkan detail lama saat loading
        state.error = null;
      })
      .addCase(fetchClassroomConfigById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchClassroomConfigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerClassroomConfig.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerClassroomConfig.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerClassroomConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateClassroomConfig.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateClassroomConfig.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateClassroomConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeClassroomConfig.fulfilled, (state, action) => {
        state.configs = state.configs.filter(
          (c) => c.classroomConfigId !== action.payload,
        );
      })

      .addCase(validateClassroomCsv.pending, (state) => {
        state.csvValidation.loading = true;
        state.error = null;
      })
      .addCase(validateClassroomCsv.fulfilled, (state, action) => {
        state.csvValidation.loading = false;
        state.csvValidation.validStudents = action.payload.validStudents;
        state.csvValidation.invalidNis = action.payload.invalidNis;
      })
      .addCase(validateClassroomCsv.rejected, (state, action) => {
        state.csvValidation.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetConfigStatus } = classroomConfigSlice.actions;
export default classroomConfigSlice.reducer;
