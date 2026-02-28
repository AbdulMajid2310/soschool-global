import { api } from '@/lib/axiosInstance';
import { CreateBulkCalendarPayload, UpdateCalendarPayload } from './types';

export const academicCalendarService = {
    async getBySchool(schoolId: string) {
        const response = await api.get(`/academic-calendars/school/${schoolId}`);
        return response.data;
    },

    async createBulk(payload: CreateBulkCalendarPayload) {
        const response = await api.post('/academic-calendars/bulk', payload);
        return response.data;
    },

    async update(payload: UpdateCalendarPayload) {
        // Kita gunakan PUT sesuai controller yang dibuat sebelumnya
        const response = await api.put(`/academic-calendars/${payload.id}`, payload);
        return response.data;
    },

    async delete(id: string) {
        const response = await api.delete(`/academic-calendars/${id}`);
        return response.data;
    }
};