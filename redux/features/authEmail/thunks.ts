import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authEmailApi from "./service";
import { ActivateAccountPayload, ResetPasswordPayload } from "./types";

export const forgotPasswordThunk = createAsyncThunk(
  "authEmail/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      return await authEmailApi.forgotPasswordApi(email);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengirim email",
      );
    }
  },
);

export const activateAccountThunk = createAsyncThunk(
  "authEmail/activateAccount",
  async (payload: ActivateAccountPayload, { rejectWithValue }) => {
    try {
      return await authEmailApi.activateAccountApi(payload);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal aktivasi");
    }
  },
);

export const resetPasswordThunk = createAsyncThunk(
  "authEmail/resetPassword",
  async (payload: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      return await authEmailApi.resetPasswordApi(payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal reset password",
      );
    }
  },
);

export const sendBulkVerification = createAsyncThunk(
  "auth/sendBulkVerification",
  async (userIds: string[], { rejectWithValue }) => {
    try {
      const response = await authEmailApi.sendBulkVerificationApi(userIds);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengirim email verifikasi",
      );
    }
  },
);
