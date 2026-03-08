import { api } from '@/lib/axiosInstance';
import { AxiosResponse } from 'axios';
import { ClassroomStudent, PromotionMapping } from './types';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const classroomStudentService = {
  getAll: (schoolId: string): Promise<AxiosResponse<ApiResponse<ClassroomStudent[]>>> =>
    api.get(`/classroom-students/school/${schoolId}`),

  getByPeriod: (schoolId: string, periodId: string): Promise<AxiosResponse<ApiResponse<ClassroomStudent[]>>> =>
    api.get(`/classroom-students/school/${schoolId}/period/${periodId}`),

  getByConfig: (schoolId: string, configId: string): Promise<AxiosResponse<ApiResponse<ClassroomStudent[]>>> =>
    api.get(`/classroom-students/config/${configId}/school/${schoolId}`),

  updateStatus: (id: string, status: string): Promise<AxiosResponse<ApiResponse<ClassroomStudent>>> =>
    api.patch(`/classroom-students/${id}/status`, { status }),

  promoteStudents: (mappings: PromotionMapping[]): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post(`/api/classroom-students/promote`, mappings),

  graduateStudents: (studentIds: string[], configId: string): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post(`/classroom-students/graduate`, { studentIds, configId }),
};