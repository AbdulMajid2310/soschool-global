import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParentState, SchoolParent } from "./types";
import {
  fetchParents,
  createParent,
  updateParent,
  deleteParent,
  createParentByUserId,
  fetchParentById,
} from "./thunks";

const initialState: ParentState = {
  parents: [],
  currentParent: null,
  loading: false,
  error: null,
};

const parentSlice = createSlice({
  name: "schoolParents",
  initialState,
  reducers: {
    clearCurrentParent: (state) => {
      state.currentParent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSelectedParent: (state, action: PayloadAction<SchoolParent | null>) => {
      state.currentParent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchParents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.loading = false;
        state.parents = action.payload;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchParentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchParentById.fulfilled,
        (state, action: PayloadAction<SchoolParent>) => {
          state.loading = false;
          state.currentParent = action.payload;
        },
      )
      .addCase(fetchParentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createParent.fulfilled, (state, action) => {
        state.parents.unshift(action.payload);
      })
      // Update
      .addCase(updateParent.fulfilled, (state, action) => {
        const index = state.parents.findIndex(
          (p) => p.parentId === action.payload.parentId,
        );
        if (index !== -1) state.parents[index] = action.payload;
      })
      // Delete
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.parents = state.parents.filter(
          (p) => p.parentId !== action.payload,
        );
      })

      .addMatcher(
        (action) =>
          [
            createParent.fulfilled.type,
            createParentByUserId.fulfilled.type,
          ].includes(action.type),
        (state, action: PayloadAction<SchoolParent>) => {
          state.loading = false;
          state.parents.unshift(action.payload); // Tambah ke baris paling atas tabel
        },
      )
      .addMatcher(
        (action) =>
          [
            createParent.pending.type,
            createParentByUserId.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          [
            createParent.rejected.type,
            createParentByUserId.rejected.type,
          ].includes(action.type),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearCurrentParent, clearError, setSelectedParent } =
  parentSlice.actions;
export default parentSlice.reducer;
