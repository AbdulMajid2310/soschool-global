import { api } from "@/lib/axiosInstance";
import {
  CreateSubjectPayload,
  UpdateSubjectPayload,
  CreateBulkSubjectPayload,
} from "./types";

export const subjectService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/subjects/school/${schoolId}`);
    return response.data;
  },

  async getOne(subjectId: string) {
    const response = await api.get(`/subjects/${subjectId}`);
    return response.data;
  },

  async create(payload: CreateSubjectPayload) {
    const response = await api.post("/subjects", payload);
    return response.data;
  },

  // Tambahkan Fitur Bulk
  async createBulk(payload: CreateBulkSubjectPayload) {
    const response = await api.post("/subjects/bulk", payload);
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

  async refreshAiSummary(subjectId: string) {
    // Sesuaikan dengan endpoint backend: POST :id/sync-ai
    const response = await api.post(`/subjects/${subjectId}/sync-ai`);
    return response.data;
  },
};
