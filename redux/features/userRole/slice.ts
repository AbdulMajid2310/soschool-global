import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoleState, UserRole } from "./type";
import {
  getAllUserRoles,
  getUserRoleById,
  getUserRoleByCode,
  createUserRole,
  updateUserRole,
  deleteUserRole,
} from "./thunk";

const initialState: UserRoleState = {
  roles: [],
  role: null,
  roleLoading: false,
  roleError: null,
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    clearRoleDetail: (state) => {
      state.role = null;
      state.roleError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Success: Get All
      .addCase(
        getAllUserRoles.fulfilled,
        (state, action: PayloadAction<UserRole[]>) => {
          state.roleLoading = false;
          state.roles = action.payload;
        },
      )
      // Handle Success: Get Single (ID or Code)
      .addCase(
        getUserRoleById.fulfilled,
        (state, action: PayloadAction<UserRole>) => {
          state.roleLoading = false;
          state.role = action.payload;
        },
      )
      .addCase(
        getUserRoleByCode.fulfilled,
        (state, action: PayloadAction<UserRole>) => {
          state.roleLoading = false;
          state.role = action.payload;
        },
      )
      // Handle Success for Mutation (Create, Update, Delete)
      .addCase(createUserRole.fulfilled, (state) => {
        state.roleLoading = false;
      })
      .addCase(updateUserRole.fulfilled, (state) => {
        state.roleLoading = false;
        state.role = null;
      })
      .addCase(deleteUserRole.fulfilled, (state) => {
        state.roleLoading = false;
      })

      // Global Matchers for Role Module
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") &&
          action.type.startsWith("userRole/"),
        (state) => {
          state.roleLoading = true;
          state.roleError = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.startsWith("userRole/"),
        (state, action: any) => {
          state.roleLoading = false;
          state.roleError = action.payload as string;
        },
      );
  },
});

export const { clearRoleDetail } = userRoleSlice.actions;
export default userRoleSlice.reducer;
