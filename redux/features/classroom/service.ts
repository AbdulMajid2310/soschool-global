import { api } from '@/lib/axiosInstance';
import { CreateClassroomPayload, UpdateClassroomPayload } from './types';

export const classroomService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/school-classrooms/school/${schoolId}`);
    return response.data;
  },

  async create(payload: CreateClassroomPayload) {
    const response = await api.post('/school-classrooms', payload);
    return response.data;
  },

  async update(payload: UpdateClassroomPayload) {
    const response = await api.patch(
      `/school-classrooms/${payload.id}/school/${payload.schoolId}`,
      { name: payload.name, major: payload.major }
    );
    return response.data;
  },

  async delete(id: string, schoolId: string) {
    const response = await api.delete(`/school-classrooms/${id}/school/${schoolId}`);
    return response.data;
  }
};