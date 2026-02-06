import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAccessState, UserAccessResponse } from './types';
import { getAllUserAccess } from './thunk';

const initialState: UserAccessState = {
  accessList: [],
  loading: false,
  error: null,
};

const userAccessSlice = createSlice({
  name: 'userAccess',
  initialState,
  reducers: {
    resetAccessState: (state) => {
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserAccess.fulfilled, (state, action: PayloadAction<UserAccessResponse>) => {
        state.loading = false;
        state.accessList = action.payload.data;
      })
      .addCase(getAllUserAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAccessState } = userAccessSlice.actions;
export default userAccessSlice.reducer;