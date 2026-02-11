// src/redux/features/profile/profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfileMe, logoutUser } from './thunk'; // Tambahkan import logoutUser
import { ProfileState, UserProfileData } from './type';

const initialState: ProfileState = {
  profile: null,
  authLoading: false,
  AuthError: null,
  success: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.AuthError = null;
      state.success = false;
    },
    // Reducer manual jika ingin logout tanpa nunggu response API (opsional)
    clearProfile: (state) => {
      state.profile = null;
      state.AuthError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Get Profile Me ---
      .addCase(getProfileMe.pending, (state) => {
        state.authLoading = true;
        state.AuthError = null;
      })
      .addCase(getProfileMe.fulfilled, (state, action: PayloadAction<UserProfileData>) => {
        state.authLoading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(getProfileMe.rejected, (state, action) => {
        state.authLoading = false;
        state.profile = null;
        state.AuthError = action.payload as string;
      })

      // --- Logout User ---
      .addCase(logoutUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Reset total state saat logout sukses
        state.profile = null;
        state.authLoading = false;
        state.success = false;
        state.AuthError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.authLoading = false;
        // Tetap hapus profile jika logout gagal di server tapi ingin user tetap keluar
        state.profile = null;
        state.AuthError = action.payload as string;
      });
  },
});

export const { resetProfileState, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;