import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchoolPeriodState } from './types';
import { fetchSchoolPeriods, fetchActivePeriod, togglePeriodStatus, deletePeriod, updatePeriod, createPeriod } from './thunk';

const initialState: SchoolPeriodState = {
    periods: [],
    activePeriod: null,
    loading: false,
    error: null,
    success: false,
};

const schoolPeriodSlice = createSlice({
    name: 'schoolPeriod',
    initialState,
    reducers: {
        resetPeriodState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearActivePeriod: (state) => {
            state.activePeriod = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Periods
            .addCase(fetchSchoolPeriods.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSchoolPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.periods = action.payload;
            })
            .addCase(fetchSchoolPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- CREATE ---
            .addCase(createPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPeriod.fulfilled, (state) => {
                state.loading = false;
                state.success = true; // Akan trigger useEffect di UI untuk tutup modal
            })
            .addCase(createPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Active Period
            .addCase(fetchActivePeriod.fulfilled, (state, action) => {
                state.activePeriod = action.payload;
            })

            //Update period
            .addCase(updatePeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePeriod.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updatePeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Toggle & Delete (Handling Global Success)
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') &&
                    (action.type.includes('toggleStatus') || action.type.includes('delete')),
                (state) => {
                    state.success = true;
                    state.loading = false;
                }
            );
    },
});

export const { resetPeriodState, clearActivePeriod } = schoolPeriodSlice.actions;
export default schoolPeriodSlice.reducer;