
import { api } from '@/lib/axiosInstance';
import { CreateSchoolPeriod, SchoolPeriod, ToggleActivePayload } from './types';

export const SchoolPeriodService = {
    getAllBySchool: (schoolId: string) =>
        api.get(`school-periods/school/${schoolId}`),

    getActiveBySchool: (schoolId: string) =>
        api.get(`school-periods/active/${schoolId}`),

    toggleActive: (payload: ToggleActivePayload) =>
        api.patch(`school-periods/${payload.id}/activate/${payload.schoolId}`),

    create: (dto: CreateSchoolPeriod) =>
        api.post(`school-periods`, dto),

    delete: (id: string) =>
        api.delete(`school-periods/${id}`),

    update: (id: string, dto: any) =>
        api.put(`school-periods/${id}`, dto)
};