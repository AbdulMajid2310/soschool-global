// src/redux/features/school_schedule/service.ts
import { api } from '@/lib/axiosInstance';
import { CreateSchedulePayload, UpdateSchedulePayload } from './types';

export const scheduleService = {
    async getBySchool(schoolId: string) {
        const res = await api.get(`/school-schedules/school/${schoolId}`);
        return res.data;
    },

    async getByClassroom(classroomId: string) {
        const res = await api.get(`/school-schedules/classroom/${classroomId}`);
        return res.data;
    },

    async getByTeacher(teacherId: string) {
        const res = await api.get(`/school-schedules/teacher/${teacherId}`);
        return res.data;
    },

    async getOne(id: string) {
        const res = await api.get(`/school-schedules/${id}`);
        return res.data;
    },

    async create(payload: CreateSchedulePayload) {
        const res = await api.post('/school-schedules', payload);
        return res.data;
    },

    async update(payload: UpdateSchedulePayload) {
        const { scheduleId, ...data } = payload;
        const res = await api.patch(`/school-schedules/${scheduleId}`, data);
        return res.data;
    },

    async delete(id: string) {
        const res = await api.delete(`/school-schedules/${id}`);
        return res.data;
    }
};