import { Address } from "../address/types";

export interface School {
  schoolId: string;
  name: string;
  nisp: string;
  avatar?: string;
  background?: string;
  level: string;
  establishedDate: string;
  domain: string;
  email: string;
  accreditation: string;
  plan: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

export interface SchoolAnalysis {
  teacherStudentRatio: string;
  parentEngagementRate: string;
  classroomUtilizationRate: string;
  averageClassCapacity: number;
  operationalLoad: string;
  configCoverage: string;
}
export interface SchoolCensus {
  totalTeachers: number;
  totalStudents: number;
  totalStaffs: number;
  totalParents: number;
  totalClassrooms: number;
  totalClassroomConfigs: number;
}

export interface SchoolState {
  schools: School[];
  selectedSchool: School | null;
  summarySchool: SummarySchool | null;
  loading: boolean;
  error: string | null;
}

export interface SummarySchool {
  meta: School;
  census: SchoolCensus;
  analysis: SchoolAnalysis;
}

export interface CreateSchoolRequest {
  name: string;
  nisp: string;
  email: string;
  level: string;
  establishedDate: string;
  accreditation: string;
  plan: string;
  domain?: string;
  phone?: string;
  avatar?: File;
  background?: File;
}

export interface UpdateSchoolRequest extends Partial<
  Omit<CreateSchoolRequest, "avatar" | "background">
> {
  avatar?: File | string; // Bisa File baru atau string URL lama
  background?: File | string;
}
