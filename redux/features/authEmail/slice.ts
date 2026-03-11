import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  forgotPasswordThunk,
  activateAccountThunk,
  resetPasswordThunk,
  sendBulkVerification, // <-- Pastikan ini diimport
} from "./thunks";

interface AuthEmailState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthEmailState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const authEmailSlice = createSlice({
  name: "authEmail",
  initialState,
  reducers: {
    clearEmailStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Masukkan sendBulkVerification ke dalam array ini
    const emailThunks = [
      forgotPasswordThunk,
      activateAccountThunk,
      resetPasswordThunk,
      sendBulkVerification, // <-- Thunk baru kamu otomatis ikut matcher di bawah
    ];

    builder
      // Matcher untuk status Pending
      .addMatcher(
        (action) => emailThunks.some((t) => t.pending.match(action)),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
      )
      // Matcher untuk status Fulfilled
      .addMatcher(
        (action) => emailThunks.some((t) => t.fulfilled.match(action)),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = true;
          // Mengambil message dari response API
          state.message = action.payload?.message || "Operasi berhasil";
        },
      )
      // Matcher untuk status Rejected
      .addMatcher(
        (action) => emailThunks.some((t) => t.rejected.match(action)),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = false;
          state.error = (action.payload as string) || "Terjadi kesalahan";
        },
      );
  },
});

export const { clearEmailStatus } = authEmailSlice.actions;
export default authEmailSlice.reducer;
