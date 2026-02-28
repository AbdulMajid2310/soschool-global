import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffState, SchoolStaff, StaffStats, ImportReport } from './types';
import {
    fetchStaffs,
    registerStaff,
    updateStaffData,
    toggleStaffStatus,
    deleteStaff,
    importStaffExcel
} from './thunks';

const initialState: StaffState = {
    staffs: [],
    stats: { total: 0, active: 0, inactive: 0 },
    selectedStaffId: null,
    importReport: null,
    loading: false,
    error: null,
    success: false,
};

interface RejectedAction extends Action {
    payload: string;
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        resetStaffStatus: (state) => {
            state.error = null;
            state.success = false;
            state.importReport = null;
        },
        selectStaff: (state, action: PayloadAction<string>) => {
            state.selectedStaffId = action.payload;
        },
        clearStaffSelection: (state) => {
            state.selectedStaffId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaffs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStaffs.fulfilled, (state, action: PayloadAction<{ staffs: SchoolStaff[], stats: StaffStats }>) => {
                state.loading = false;
                state.staffs = action.payload.staffs;
                state.stats = action.payload.stats;
            })
            .addCase(fetchStaffs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(importStaffExcel.fulfilled, (state, action: PayloadAction<ImportReport>) => {
                state.loading = false;
                state.success = true;
                state.importReport = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending') && !action.type.includes('fetchAll'),
                (state) => {
                    state.loading = true;
                    state.success = false;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => [
                    registerStaff.fulfilled.type,
                    updateStaffData.fulfilled.type,
                    toggleStaffStatus.fulfilled.type,
                    deleteStaff.fulfilled.type
                ].includes(action.type),
                (state) => {
                    state.loading = false;
                    state.success = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && !action.type.includes('fetchAll'),
                (state, action) => {
                    state.loading = false;
                    state.error = (action as RejectedAction).payload || 'Terjadi kesalahan';
                }
            );
    }
});

export const { resetStaffStatus, selectStaff, clearStaffSelection } = staffSlice.actions;
export default staffSlice.reducer;