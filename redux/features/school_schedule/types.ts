import { ClassroomConfig } from '../classroom-config/types';
import { Subject } from '../school_subject/types';
import { SchoolTeacher } from '../teacher/types';

// 1. Interface Dasar (Re-export atau gunakan yang sudah ada)
export interface IUser {
    userId: string;
    nik: string;
    username: string;
    noregistrationNumber: string;
    email: string;
    phone: string;
    avatar: string | null;
    isActive: boolean;
    gender: 'L' | 'P';
    isVerified: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}

// Sesuaikan field dengan yang kamu tulis di Service tadi (studyMaterialId, isComplete)
export interface IMaterial {
    studyMaterialId: string;
    title: string;
    content?: string;
    isComplete: boolean;
}

// 2. Interface untuk Sesi (Nested dalam Group)
export interface ISession {
    scheduleId: string;
    startTime: string;
    endTime: string;
}

// 3. Interface Utama untuk Grouped Data (Hasil dari Service findByTeacher / findAllBySchool)
export interface IGroupedSchedule {
    day: 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT' | 'SABTU';
    subject: Subject & { materials: IMaterial[] }; // Gabungkan dengan IMaterial buatan kita
    classroom: string;
    teacher: SchoolTeacher;
    sessions: ISession[];
}

// 4. Interface Summary Statistik
export interface IScheduleSummary {
    totalTeachingHours: number;
    totalClasses: number;
    totalMaterials: number;
    completedMaterials: number;
    materialWeightPercentage: number;
}

// 5. Interface untuk Model Database (Data Satuan / Flat)
// Digunakan saat Create, Update, atau Delete per row
export interface SchoolSchedule {
    scheduleId: string;
    day: 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT' | 'SABTU';
    startTime: string;
    endTime: string;
    subject: Subject;
    teacher: SchoolTeacher;
    classroomConfig: ClassroomConfig;
}

// 6. Payload untuk API Mutation
export interface CreateSchedulePayload {
    day: string;
    startTime: string;
    endTime: string;
    subjectId: string;
    teacherId: string;
    classroomConfigId: string;
}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {
    scheduleId: string;
}

// 7. State Redux (Ini yang paling krusial, Majid!)
export interface ScheduleState {
    // Gunakan IGroupedSchedule karena data yang datang dari fetch sudah dikelompokkan
    schedules: IGroupedSchedule[];
    summary: IScheduleSummary | null;

    // Untuk keperluan detail atau edit
    currentSchedule: SchoolSchedule | null;

    loading: boolean;
    isSubmitting: boolean;
    error: string | null;
}

// 8. Interface untuk Response API Wrapper
export interface ITeacherScheduleResponse {
    success: boolean;
    message: string;
    data: {
        summary: IScheduleSummary;
        schedules: IGroupedSchedule[];
    };
}