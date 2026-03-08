import { Address } from "../address/types";

export interface User {
  userId: string;
  username: string;
  registrationNumber: string;
  avatar: string;
  email: string;
  phone: string;
  gender: string;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

// Tambahkan Interface untuk Statistik Monitoring
export interface UserStats {
  summary: {
    totalUser: number;
    verifiedUser: number;
    pendingUser: number;
    activeUser: number;
  };
  distribution: {
    role: string;
    count: number;
  }[];
  trend: {
    month: string;
    count: number;
  }[];
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

// Interface untuk Response Statistik
export interface UserStatsResponse {
  success: boolean;
  message: string;
  data: UserStats;
}

export interface UserState {
  users: User[];
  userDetail: User | null;
  filteredUsers: User[];
  stats: UserStats | null; // Tambahkan ini untuk monitoring
  loading: boolean;
  error: string | null;
}
