import { api } from '@/lib/axiosInstance';
import { CreateStudentPayload } from './types';

export const studentService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/school-students/school/${schoolId}`);
    return response.data; // Mengasumsikan return: { data: [...], message: "..." }
  },

  async create(payload: CreateStudentPayload) {
    const response = await api.post('/school-students', payload);
    return response.data;
  },

  async delete(studentId: string) {
    const response = await api.delete(`/school-students/${studentId}`);
    return response.data;
  },

  async update(studentId: string, data: any) {
  const response = await api.put(`/school-students/${studentId}`, data);
  return response.data;
}


};