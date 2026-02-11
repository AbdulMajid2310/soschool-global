import { api } from '@/lib/axiosInstance';
import { CreateSubjectPayload, UpdateSubjectPayload } from './types';

export const subjectService = {
    async getBySchool(schoolId: string) {
        const response = await api.get(`/subjects/school/${schoolId}`);
        return response.data; // successResponse { data: Subject[] }
    },

    async getOne(subjectId: string) {
        const response = await api.get(`/subjects/${subjectId}`);
        return response.data;
    },

    async create(payload: CreateSubjectPayload) {
        const response = await api.post('/subjects', payload);
        return response.data;
    },

    async update(payload: UpdateSubjectPayload) {
        const { subjectId, ...data } = payload;
        const response = await api.patch(`/subjects/${subjectId}`, data);
        return response.data;
    },

    async delete(subjectId: string) {
        const response = await api.delete(`/subjects/${subjectId}`);
        return response.data;
    },

    // Endpoint khusus untuk refresh ringkasan AI jika dibutuhkan manual
    async refreshAiSummary(subjectId: string) {
        const response = await api.patch(`/subjects/${subjectId}/refresh-summary`);
        return response.data;
    }
};