export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ActivateAccountPayload {
  token: string;
  password?: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
