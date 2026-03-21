import { api } from "@/lib/axiosInstance";
import {
  CreateSchedulePayload,
  UpdateSchedulePayload,
  CreateBulkSchedulePayload,
} from "./types";

export const scheduleService = {
  async getBySchool(schoolId: string) {
    const res = await api.get(`/school-schedules/school/${schoolId}`);
    return res.data;
  },

  async getByClassroom(classroomId: string) {
    const res = await api.get(`/school-schedules/classroom/${classroomId}`);
    return res.data;
  },

  async getByTeacher(teacherId: string, day?: string) {
    const params = new URLSearchParams();
    if (day) params.append("day", day);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await api.get(
      `/school-schedules/teacher/${teacherId}${queryString}`,
    );

    return response.data;
  },

  async getSpecificSchedule(
    teacherId: string,
    subjectId: string,
    configId: string,
  ) {
    const res = await api.get(
      `/school-schedules/teacher/${teacherId}/subject/${subjectId}/config/${configId}`,
    );
    return res.data;
  },

  async getOne(id: string) {
    const res = await api.get(`/school-schedules/${id}`);
    return res.data;
  },

  async create(payload: CreateSchedulePayload) {
    const res = await api.post("/school-schedules", payload);
    return res.data;
  },

  async createBulk(payload: CreateBulkSchedulePayload) {
    const res = await api.post("/school-schedules/bulk", payload);
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
  },
};
