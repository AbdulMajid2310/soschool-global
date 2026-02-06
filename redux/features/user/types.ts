export interface User {
  userId: string;
  username: string;
  noregistrationNumber: string;
  email: string;
  phone: string;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User[];
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UserState {
  users: User[];
  userDetail: User | null;
  loading: boolean;
  error: string | null;
}