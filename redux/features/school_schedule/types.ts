import { ClassroomConfig } from "../classroom-config/types";
import { Subject } from "../school_subject/types";
import { SchoolTeacher } from "../teacher/types";

export interface IUser {
  userId: string;
  nik: string;
  username: string;
  noregistrationNumber: string;
  email: string;
  phone: string;
  avatar: string | null;
  isActive: boolean;
  gender: "L" | "P";
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMaterial {
  studyMaterialId: string;
  title: string;
  content?: string;
  isComplete: boolean;
}

export interface ISession {
  scheduleId: string;
  startTime: string;
  day: string;
  endTime: string;
}

export interface IGroupedSchedule {
  day: "SENIN" | "SELASA" | "RABU" | "KAMIS" | "JUMAT" | "SABTU";
  subject: Subject;
  classroom: ClassroomConfig;
  teacher: SchoolTeacher;
  sessions: ISession[];
}

export interface ISpecificScheduleDetail {
  day: "SENIN" | "SELASA" | "RABU" | "KAMIS" | "JUMAT" | "SABTU";
  subject: Subject;
  classroom: ClassroomConfig;
  teacher: SchoolTeacher;
  sessions: ISession[];
}

export interface IScheduleSummary {
  totalTeachingHours: string;
  totalMinutes: number;
  totalClasses: number;
  totalMaterials: number;
  completedMaterials: number;
  materialWeightPercentage: number;
}

export interface SchoolSchedule {
  scheduleId: string;
  day: "SENIN" | "SELASA" | "RABU" | "KAMIS" | "JUMAT" | "SABTU";
  startTime: string;
  endTime: string;
  subject: Subject;
  teacher: SchoolTeacher;
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

export interface CreateBulkSchedulePayload {
  schedules: CreateSchedulePayload[];
}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {
  scheduleId: string;
}

export interface ScheduleState {
  schedules: IGroupedSchedule[];
  summary: IScheduleSummary | null;
  currentSchedule: SchoolSchedule | null;
  specificDetail: ISpecificScheduleDetail | null;
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
}
