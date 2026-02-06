import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoleState, UserRole } from "./type";
import { getAllUserRoles, getUserRoleById } from "./thunk";

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
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Get All
      .addCase(getAllUserRoles.pending, (state) => {
        state.roleLoading = true;
        state.roleError = null;
      })
      .addCase(getAllUserRoles.fulfilled, (state, action: PayloadAction<UserRole[]>) => {
        state.roleLoading = false;
        state.roles = action.payload;
      })
      .addCase(getAllUserRoles.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = action.payload as string;
      })

      // Handle Get By Id
      .addCase(getUserRoleById.pending, (state) => {
        state.roleLoading = true;
      })
      .addCase(getUserRoleById.fulfilled, (state, action: PayloadAction<UserRole>) => {
        state.roleLoading = false;
        state.role = action.payload;
      })
      .addCase(getUserRoleById.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = action.payload as string;
      });
  },
});

export const { clearRoleDetail } = userRoleSlice.actions;
export default userRoleSlice.reducer;