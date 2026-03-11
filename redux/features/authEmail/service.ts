import { api } from "@/lib/axiosInstance";
import {
  ApiResponse,
  ActivateAccountPayload,
  ResetPasswordPayload,
} from "./types";

const AUTH_URL = "/auth";

export const forgotPasswordApi = async (
  email: string,
): Promise<ApiResponse> => {
  const response = await api.post(`${AUTH_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPasswordApi = async (
  payload: ResetPasswordPayload,
): Promise<ApiResponse> => {
  const response = await api.post(`${AUTH_URL}/reset-password`, payload);
  return response.data;
};

export const activateAccountApi = async (
  payload: ActivateAccountPayload,
): Promise<ApiResponse> => {
  const response = await api.post(`${AUTH_URL}/activate`, payload);
  return response.data;
};

export const sendBulkVerificationApi = async (
  userIds: string[],
): Promise<ApiResponse> => {
  const response = await api.post(`${AUTH_URL}/send-bulk-verification`, {
    userIds,
  });
  return response.data;
};
