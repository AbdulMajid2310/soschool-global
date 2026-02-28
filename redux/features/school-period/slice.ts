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
            // --- FETCH ALL ---
            .addCase(fetchSchoolPeriods.pending, (state) => {
                state.loading = true;
                state.error = null; // Bersihkan error lama saat fetch baru
            })
            .addCase(fetchSchoolPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.periods = action.payload;
            })
            .addCase(fetchSchoolPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- FETCH ACTIVE ---
            .addCase(fetchActivePeriod.fulfilled, (state, action) => {
                state.activePeriod = action.payload;
            })
            .addCase(fetchActivePeriod.rejected, (state) => {
                // Jika tidak ada periode aktif, kita set null tanpa harus mengisi state.error
                // agar tidak muncul alert error yang mengganggu di dashboard.
                state.activePeriod = null;
            })

            // --- CREATE & UPDATE ---
            // Gunakan PayloadAction<any> atau AnyAction untuk matcher agar TS tidak protes
            .addMatcher(
                (action): action is PayloadAction<string> => action.type.endsWith('/rejected') && !action.type.includes('fetchActive'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload; // Sekarang .payload sudah dikenali
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') &&
                    (action.type.includes('create') ||
                        action.type.includes('update') ||
                        action.type.includes('toggleStatus') ||
                        action.type.includes('delete')),
                (state) => {
                    state.loading = false;
                    state.success = true;
                }
            );
    },
});

export const { resetPeriodState, clearActivePeriod } = schoolPeriodSlice.actions;
export default schoolPeriodSlice.reducer;