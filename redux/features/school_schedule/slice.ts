import { createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ScheduleState, SchoolSchedule, IGroupedSchedule, IScheduleSummary } from './types';
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
    summary: null,
    loading: false,
    isSubmitting: false,
    error: null,
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        clearScheduleError: (state) => {
            state.error = null;
        },
        selectSchedule: (state, action: PayloadAction<SchoolSchedule | null>) => {
            state.currentSchedule = action.payload;
        },
        resetScheduleState: () => initialState
    },
    extraReducers: (builder: ActionReducerMapBuilder<ScheduleState>) => {
        builder
            .addCase(fetchScheduleDetail.fulfilled, (state, action: PayloadAction<SchoolSchedule>) => {
                state.loading = false;
                state.currentSchedule = action.payload;
            })

            .addCase(fetchSchedulesByTeacher.fulfilled, (state, action: PayloadAction<{ summary: IScheduleSummary, schedules: IGroupedSchedule[] }>) => {
                state.loading = false;
                state.schedules = action.payload.schedules;
                state.summary = action.payload.summary;
            })

            .addCase(createSchedule.pending, (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addCase(createSchedule.fulfilled, (state) => {
                state.isSubmitting = false;
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload as string;
            })

            .addCase(updateSchedule.pending, (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addCase(updateSchedule.fulfilled, (state) => {
                state.isSubmitting = false;
                state.currentSchedule = null;
            })
            .addCase(updateSchedule.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload as string;
            })

            .addCase(deleteSchedule.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSchedule.fulfilled, (state) => {
                state.loading = false;
            })

            .addMatcher(
                (action) => action.type.endsWith('/pending') && !action.type.includes('create') && !action.type.includes('update'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && !action.type.includes('create') && !action.type.includes('update'),
                (state, action: any) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            )
            .addMatcher(
                (action) => [
                    fetchSchedulesBySchool.fulfilled.type,
                    fetchSchedulesByClass.fulfilled.type
                ].includes(action.type),
                (state, action: PayloadAction<IGroupedSchedule[]>) => {
                    state.loading = false;
                    state.schedules = action.payload;
                    state.summary = null;
                }
            );
    },
});

export const { clearScheduleError, selectSchedule, resetScheduleState } = scheduleSlice.actions;
export default scheduleSlice.reducer;