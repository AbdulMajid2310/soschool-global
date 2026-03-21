import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import {
  ScheduleState,
  SchoolSchedule,
  IGroupedSchedule,
  ISpecificScheduleDetail,
} from "./types";
import {
  fetchSchedulesBySchool,
  fetchSchedulesByClass,
  fetchSchedulesByTeacher,
  fetchScheduleDetail,
  fetchSpecificScheduleDetail,
  updateSchedule,
} from "./thunks";

const initialState: ScheduleState = {
  schedules: [],
  currentSchedule: null,
  specificDetail: null,
  summary: null,
  loading: false,
  isSubmitting: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    clearScheduleError: (state) => {
      state.error = null;
    },
    selectSchedule: (state, action: PayloadAction<SchoolSchedule | null>) => {
      state.currentSchedule = action.payload;
    },
    clearSpecificDetail: (state) => {
      state.specificDetail = null;
    },
    resetScheduleState: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<ScheduleState>) => {
    builder
      .addCase(
        fetchScheduleDetail.fulfilled,
        (state, action: PayloadAction<SchoolSchedule>) => {
          state.loading = false;
          state.currentSchedule = action.payload;
        },
      )
      .addCase(
        fetchSpecificScheduleDetail.fulfilled,
        (state, action: PayloadAction<ISpecificScheduleDetail>) => {
          state.loading = false;
          state.specificDetail = action.payload;
        },
      )
      .addCase(fetchSchedulesByTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload?.schedules ?? [];
        state.summary = action.payload?.summary ?? null;
      })
      .addCase(updateSchedule.fulfilled, (state) => {
        state.isSubmitting = false;
        state.currentSchedule = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.error = null;
          const isMutation =
            action.type.includes("create") ||
            action.type.includes("update") ||
            action.type.includes("Bulk") ||
            action.type.includes("delete");

          if (isMutation) {
            state.isSubmitting = true;
          } else {
            state.loading = true;
            state.schedules = [];
            state.summary = null;
            state.specificDetail = null;
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.isSubmitting = false;
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : (action.error?.message ?? "Network Protocol Breach");
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
          state.isSubmitting = false;
        },
      )
      .addMatcher(
        (action) =>
          [
            fetchSchedulesBySchool.fulfilled.type,
            fetchSchedulesByClass.fulfilled.type,
          ].includes(action.type),
        (state, action: PayloadAction<IGroupedSchedule[]>) => {
          state.schedules = action.payload ?? [];
          state.summary = null;
        },
      );
  },
});

export const {
  clearScheduleError,
  selectSchedule,
  clearSpecificDetail,
  resetScheduleState,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
