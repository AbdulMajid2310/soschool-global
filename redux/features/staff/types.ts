import { User } from "../user/types";

export interface StaffStats {
    total: number;
    active: number;
    inactive: number;
}

export interface ImportErrorDetail {
    baris: number;
    nama: string;
    pesan: string;
}

export interface ImportReport {
    total: number;
    success: number;
    failed: number;
    errors: ImportErrorDetail[];
}

export interface SchoolStaff {
    staffId: string;
    position: string;
    isActive: boolean;
    employeeId?: string;
    nip?: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface StaffState {
    staffs: SchoolStaff[];
    stats: StaffStats;
    selectedStaffId: string | null;
    importReport: ImportReport | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface CreateStaffPayload {
    position: string;
    schoolId: string;
    username: string;
    nik: string;
    email: string;
    phone?: string;
    password?: string;
    employeeId?: string;
    nip?: string;
}