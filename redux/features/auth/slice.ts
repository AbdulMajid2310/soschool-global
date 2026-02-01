// src/redux/features/profile/profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfileMe } from './thunk';
import { ProfileState, UserProfileData } from './type';

const initialState: ProfileState = {
  profile: null, // Diubah dari user -> profile
  loading: false,
  error: null,
  success: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileMe.fulfilled, (state, action: PayloadAction<UserProfileData>) => {
        state.loading = false;
        // Pastikan menyimpan action.payload (atau action.payload.data tergantung return di thunk)
        state.profile = action.payload; 
        state.success = true;
      })
      .addCase(getProfileMe.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload as string;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;