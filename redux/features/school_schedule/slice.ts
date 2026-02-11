// src/redux/features/school_schedule/scheduleSlice.ts
import { createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ScheduleState, SchoolSchedule } from './types';
import {
    fetchSchedulesBySchool,
    fetchSchedulesByClass,
    fetchSchedulesByTeacher,
    fetchScheduleDetail,
    createSchedule,
    updateSchedule,
    deleteSchedule
} from './thunks';

const initialState: ScheduleState = {
    schedules: [],
    currentSchedule: null,
    loading: false,
    isSubmitting: false,
    error: null,
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        clearScheduleError: (state: ScheduleState) => {
            state.error = null;
        },
        selectSchedule: (state: ScheduleState, action: PayloadAction<SchoolSchedule | null>) => {
            state.currentSchedule = action.payload;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<ScheduleState>) => {
        builder
            // --- Fetch Detail ---
            .addCase(fetchScheduleDetail.pending, (state: ScheduleState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScheduleDetail.fulfilled, (state: ScheduleState, action: PayloadAction<SchoolSchedule>) => {
                state.loading = false;
                state.currentSchedule = action.payload;
            })
            .addCase(fetchScheduleDetail.rejected, (state: ScheduleState, action: any) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- Create Schedule ---
            .addCase(createSchedule.pending, (state: ScheduleState) => {
                state.isSubmitting = true;
            })
            .addCase(createSchedule.fulfilled, (state: ScheduleState, action: PayloadAction<SchoolSchedule>) => {
                state.isSubmitting = false;
                state.schedules.push(action.payload);
                state.schedules.sort((a: SchoolSchedule, b: SchoolSchedule) => a.startTime.localeCompare(b.startTime));
            })
            .addCase(createSchedule.rejected, (state: ScheduleState, action: any) => {
                state.isSubmitting = false;
                state.error = action.payload as string;
            })

            // --- Update Schedule ---
            .addCase(updateSchedule.pending, (state: ScheduleState) => {
                state.isSubmitting = true;
            })
            .addCase(updateSchedule.fulfilled, (state: ScheduleState, action: PayloadAction<SchoolSchedule>) => {
                state.isSubmitting = false;
                const index = state.schedules.findIndex((s: SchoolSchedule) => s.scheduleId === action.payload.scheduleId);
                if (index !== -1) {
                    state.schedules[index] = action.payload;
                    state.schedules.sort((a: SchoolSchedule, b: SchoolSchedule) => a.startTime.localeCompare(b.startTime));
                }
                if (state.currentSchedule?.scheduleId === action.payload.scheduleId) {
                    state.currentSchedule = action.payload;
                }
            })
            .addCase(updateSchedule.rejected, (state: ScheduleState, action: any) => {
                state.isSubmitting = false;
                state.error = action.payload as string;
            })

            // --- Delete Schedule ---
            .addCase(deleteSchedule.fulfilled, (state: ScheduleState, action: PayloadAction<string>) => {
                state.schedules = state.schedules.filter((s: SchoolSchedule) => s.scheduleId !== action.payload);
                if (state.currentSchedule?.scheduleId === action.payload) state.currentSchedule = null;
            })

            // --- Matchers for Fetching Schedules ---
            .addMatcher(
                (action) => [
                    fetchSchedulesBySchool.pending.type,
                    fetchSchedulesByClass.pending.type,
                    fetchSchedulesByTeacher.pending.type
                ].includes(action.type),
                (state: ScheduleState) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            // 2. Matcher Fulfilled
            .addMatcher(
                (action): action is PayloadAction<SchoolSchedule[]> => [
                    fetchSchedulesBySchool.fulfilled.type,
                    fetchSchedulesByClass.fulfilled.type,
                    fetchSchedulesByTeacher.fulfilled.type
                ].includes(action.type),
                (state: ScheduleState, action: PayloadAction<SchoolSchedule[]>) => {
                    state.loading = false;
                    state.schedules = action.payload;
                }
            )
            // 3. Matcher Rejected
            .addMatcher(
                (action): action is PayloadAction<string> => [
                    fetchSchedulesBySchool.rejected.type,
                    fetchSchedulesByClass.rejected.type,
                    fetchSchedulesByTeacher.rejected.type
                ].includes(action.type),
                (state: ScheduleState, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const { clearScheduleError, selectSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;