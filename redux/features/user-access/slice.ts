import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserAccessState,
  UserAccessResponse,
  GroupedUserAccessResponse,
} from "./types";
import {
  getAllUserAccess,
  getUserAccessGrouped,
  createBulkAccess,
  updateUserAccess,
  deleteUserAccess,
  deleteBulkAccess,
} from "./thunk";

const initialState: UserAccessState = {
  accessList: [],
  groupedAccess: [],
  activeAccess: null,
  loading: false,
  error: null,
};

const userAccessSlice = createSlice({
  name: "userAccess",
  initialState,
  reducers: {
    setActiveAccess: (state, action: PayloadAction<string>) => {
      const selected = state.accessList.find(
        (a) => a.userAccessId === action.payload,
      );
      if (selected) {
        state.activeAccess = selected;
      }
    },
    resetAccessState: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching Data
      .addCase(
        getAllUserAccess.fulfilled,
        (state, action: PayloadAction<UserAccessResponse>) => {
          state.loading = false;
          state.accessList = action.payload.data;
        },
      )
      .addCase(
        getUserAccessGrouped.fulfilled,
        (state, action: PayloadAction<GroupedUserAccessResponse>) => {
          state.loading = false;
          state.groupedAccess = action.payload.data;
        },
      )

      // Actions (Mutations)
      .addCase(createBulkAccess.fulfilled, (state) => {
        state.loading = false;
      })
      // INI YANG TADI KURANG: Daftarkan thunk delete bulk kamu
      .addCase(deleteBulkAccess.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAccess.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserAccess.fulfilled, (state) => {
        state.loading = false;
      })

      // MATCHER: Otomatis set loading: true untuk semua thunk userAccess/ (termasuk deleteBulk)
      .addMatcher(
        (action) =>
          action.type.startsWith("userAccess/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      // MATCHER: Otomatis set loading: false jika ada error
      .addMatcher(
        (action) =>
          action.type.startsWith("userAccess/") &&
          action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export const { resetAccessState, setActiveAccess } = userAccessSlice.actions;
export default userAccessSlice.reducer;
