import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { School, SchoolState } from "./types";
import {
  fetchSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  fetchSchoolById,
  fetchSchoolSummary,
} from "./thunk";

const initialState: SchoolState = {
  schools: [],
  selectedSchool: null,
  summarySchool: null,
  loading: false,
  error: null,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedSchool: (state, action: PayloadAction<School | null>) => {
      state.selectedSchool = action.payload;
    },
    clearSummary: (state) => {
      state.summarySchool = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Schools
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create School
      .addCase(createSchool.fulfilled, (state, action) => {
        state.schools.unshift(action.payload);
      })

      // getBySchoolId
      .addCase(fetchSchoolById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSchool = action.payload;

        // Opsional: Masukkan ke list schools jika belum ada
        const exists = state.schools.find(
          (s) => s.schoolId === action.payload.schoolId,
        );
        if (!exists) {
          state.schools.push(action.payload);
        }
      })

      // Fetch School Summary (Data Analisis Superadmin)
      .addCase(fetchSchoolSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summarySchool = action.payload; // Menyimpan hasil queryBuilder analisis
      })
      .addCase(fetchSchoolSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update School
      .addCase(updateSchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.schools.findIndex(
          (s) => s.schoolId === action.payload.schoolId,
        );
        if (index !== -1) {
          state.schools[index] = action.payload; // Update data di list
        }
        state.selectedSchool = action.payload; // Update data di detail
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete School
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.schools = state.schools.filter(
          (s) => s.schoolId !== action.payload,
        );
        if (state.selectedSchool?.schoolId === action.payload) {
          state.selectedSchool = null;
        }
      });
  },
});

export const { clearError, setSelectedSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
