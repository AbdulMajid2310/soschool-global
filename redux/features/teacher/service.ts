import { api } from '@/lib/axiosInstance';
import { CreateTeacherPayload } from './types';

export const teacherService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/school-teachers/school/${schoolId}`);
    return response.data;
  },

  async getProfile(schoolId: string, userId: string) {
    const response = await api.get(`/school-teachers/me/${schoolId}/${userId}`);
    return response.data;
  },

  async getOneBySchool(schoolId: string, teacherId: string) {
    const response = await api.get(`/school-teachers/school/${schoolId}/${teacherId}`);
    return response.data;
  },

  async create(payload: CreateTeacherPayload) {
    const response = await api.post('/school-teachers', payload);
    return response.data;
  },

  async importCsv(schoolId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/school-teachers/import/${schoolId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(schoolId: string, teacherId: string, data: any) {
    const response = await api.patch(`/school-teachers/school/${schoolId}/${teacherId}`, data);
    return response.data;
  },

  async updateStatus(teacherId: string, isActive: boolean) {
    const response = await api.patch(`/school-teachers/${teacherId}/status`, { isActive });
    return response.data;
  },

  async delete(schoolId: string, teacherId: string) {
    const response = await api.delete(`/school-teachers/school/${schoolId}/${teacherId}`);
    return response.data;
  }
};