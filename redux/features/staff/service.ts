import { api } from '@/lib/axiosInstance';
import { CreateStaffPayload } from './types';

export const staffService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/school-staffs/school/${schoolId}`);
    return response.data;
  },

  async create(payload: CreateStaffPayload) {
    const response = await api.post('/school-staffs', payload);
    return response.data;
  },

  async update(staffId: string, data: Partial<CreateStaffPayload>) {
    const response = await api.patch(`/school-staffs/${staffId}`, data);
    return response.data;
  },

  async updateStatus(staffId: string, isActive: boolean) {
    const response = await api.patch(`/school-staffs/${staffId}/status`, { isActive });
    return response.data;
  },

  async delete(staffId: string) {
    const response = await api.delete(`/school-staffs/${staffId}`);
    return response.data;
  },

  async importExcel(schoolId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/school-staffs/import/${schoolId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};