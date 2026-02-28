import { UserRole } from "../userRole/type";

// --- Data Dasar ---
export interface UserAuth {
  userId: string;
  username: string;
  email: string;
  nik: string;
  avatar: string | null;
  profiles: {
    isTeacher: boolean;
    isStaff: boolean;
    isStudent: boolean;
    isParent: boolean;
  };
}

export interface ActiveContext {
  userAccessId: string;
  schoolId: string | null;
  schoolName: string;
  role: UserRole;
}

export interface AvailableAccess {
  schoolId: string;
  schoolName: string;
  accessDetails: {
    userAccessId: string;
    role: UserRole;
  }[];
}

// --- Respons API ---

export interface UserProfileData {
  user: UserAuth;
  activeContext: ActiveContext | null;
  availableAccesses: AvailableAccess[];
}

// Respons untuk GET /me
export interface ProfileResponseAuth {
  success: boolean;
  message: string;
  data: UserProfileData;
}

// Respons untuk POST /login
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    sid: string; // Access Token (Session ID)
    // Biasanya login juga mengembalikan data user minimal atau availableRoles
  };
}

// Respons untuk POST /select-role
export interface SelectRoleResponse {
  success: boolean;
  message: string;
  data: {
    sid: string;        // Token baru dengan context role
    redirectUrl: string; // URL tujuan berdasarkan role.url di backend
  };
}

// --- State Management (Redux/Zustand) ---

export interface ProfileState {
  profile: UserProfileData | null;
  authLoading: boolean;
  authError: string | null;
  success: boolean;
  sid: string | null; // Simpan sid di state untuk mempermudah header auth
}