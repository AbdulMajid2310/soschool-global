import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';
import { getAllUsers, createUser, updateUser, deleteUser } from './thunk';

const initialState: UserState = {
  users: [],
  userDetail: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserDetail: (state) => {
      state.userDetail = null;
    },
    resetUserState: (state) => {
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL USERS */
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* CREATE USER */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE USER */
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })

      /* DELETE USER */
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { clearUserDetail, resetUserState } = userSlice.actions;
export default userSlice.reducer;