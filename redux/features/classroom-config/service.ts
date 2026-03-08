import { api } from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import {
  CreateClassroomConfigPayload,
  ApiResponse,
  ClassroomConfig,
  ClassroomConfigCsv,
} from "./types";

export const classroomConfigService = {
  create: (
    payload: CreateClassroomConfigPayload,
  ): Promise<AxiosResponse<ApiResponse<ClassroomConfig>>> =>
    api.post(`/classroom-configs/school/${payload.schoolId}`, payload),

  getAll: (
    schoolId: string,
    periodId?: string,
  ): Promise<AxiosResponse<ApiResponse<ClassroomConfig[]>>> =>
    api.get(`/classroom-configs/school/${schoolId}`, { params: { periodId } }),

  getById: (id: string, schoolId: string) => {
    return api.get(`/classroom-configs/${id}/school/${schoolId}`);
  },

  // service.ts
  validateCsv: async (
    schoolId: string,
    file: File,
  ): Promise<ApiResponse<ClassroomConfigCsv>> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(
      `/classroom-configs/validate-csv/school/${schoolId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data;
  },

  update: (
    id: string,
    payload: CreateClassroomConfigPayload,
  ): Promise<AxiosResponse<ApiResponse<ClassroomConfig>>> =>
    api.patch(`/classroom-configs/${id}/school/${payload.schoolId}`, payload),

  delete: (
    id: string,
    schoolId: string,
  ): Promise<AxiosResponse<ApiResponse<null>>> =>
    api.delete(`/classroom-configs/${id}/school/${schoolId}`),
};
