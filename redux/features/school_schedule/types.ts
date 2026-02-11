// src/redux/features/school_schedule/types.ts
import { ClassroomConfig } from '../classroom-config/types';
import { Subject } from '../school_subject/types';
import { SchoolTeacher } from '../teacher/types';

export interface SchoolSchedule {
    scheduleId: string;
    day: 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT' | 'SABTU';
    startTime: string;
    endTime: string;
    subject: Subject;
    teacher: SchoolTeacher
    classroomConfig: ClassroomConfig;
}

export interface CreateSchedulePayload {
    day: string;
    startTime: string;
    endTime: string;
    subjectId: string;
    teacherId: string;
    classroomConfigId: string;
}

export interface ScheduleState {
    schedules: SchoolSchedule[];
    currentSchedule: SchoolSchedule | null;
    loading: boolean;
    isSubmitting: boolean;
    error: string | null;
}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {
    scheduleId: string;
}