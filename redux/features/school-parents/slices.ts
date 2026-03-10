import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParentState, SchoolParent } from "./types";
import {
  fetchParents,
  createParent,
  updateParent,
  deleteParent,
  deleteBulkParents,
  createParentByUserId,
  fetchParentById,
} from "./thunks";

const initialState: ParentState = {
  parents: [],
  stats: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  currentParent: null,
  loading: false,
  error: null,
  success: false,
};

const parentSlice = createSlice({
  name: "schoolParents",
  initialState,
  reducers: {
    resetParentStatus: (state) => {
      state.error = null;
      state.success = false;
    },
    clearCurrentParent: (state) => {
      state.currentParent = null;
    },
    setSelectedParent: (state, action: PayloadAction<SchoolParent | null>) => {
      state.currentParent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchParents.fulfilled,
        (
          state,
          action: PayloadAction<{ parents: SchoolParent[]; stats: any }>,
        ) => {
          state.loading = false;
          state.parents = action.payload.parents;
          state.stats = action.payload.stats;
        },
      )
      .addCase(fetchParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchParentById.fulfilled,
        (state, action: PayloadAction<SchoolParent>) => {
          state.loading = false;
          state.currentParent = action.payload;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("parents/") &&
          action.type.endsWith("/pending") &&
          !action.type.includes("fetchAll"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
      )
      .addMatcher(
        (action) =>
          [
            createParent.fulfilled.type,
            createParentByUserId.fulfilled.type,
            updateParent.fulfilled.type,
            deleteParent.fulfilled.type,
            deleteBulkParents.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("parents/") &&
          action.type.endsWith("/rejected") &&
          !action.type.includes("fetchAll"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload || "Terjadi kesalahan";
          state.success = false;
        },
      );
  },
});

export const { resetParentStatus, clearCurrentParent, setSelectedParent } =
  parentSlice.actions;
export default parentSlice.reducer;
