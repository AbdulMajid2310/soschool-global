import { createSlice } from '@reduxjs/toolkit';
import {
    fetchCalendars,
    createBulkCalendar,
    updateCalendar,
    deleteCalendar
} from './thunks';
import { GroupedCalendar, CalendarItem } from './types';

interface AcademicCalendarState {
    items: GroupedCalendar[]; // Data grouped [ { month, data } ]
    detail: CalendarItem | null;
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AcademicCalendarState = {
    items: [],
    detail: null,
    loading: false,
    success: false,
    error: null,
};

const academicCalendarSlice = createSlice({
    name: 'academicCalendar',
    initialState,
    reducers: {
        resetCalendarStatus: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH ALL (GROUPED)
            .addCase(fetchCalendars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCalendars.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCalendars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // CREATE BULK
            .addCase(createBulkCalendar.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createBulkCalendar.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createBulkCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateCalendar.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateCalendar.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteCalendar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCalendar.fulfilled, (state) => {
                state.loading = false;
                // Kita tidak perlu filter manual karena di thunk sudah dispatch fetchCalendars
            })
            .addCase(deleteCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetCalendarStatus } = academicCalendarSlice.actions;
export default academicCalendarSlice.reducer;