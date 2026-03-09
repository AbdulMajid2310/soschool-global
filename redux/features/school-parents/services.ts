import { api } from "@/lib/axiosInstance";
import {
  CreateParentPayload,
  UpdateParentPayload,
  SchoolParent,
  CreateParentByUserIdPayload,
} from "./types";

export const parentApiService = {
  getAll: (schoolId: string) =>
    api.get<{ data: SchoolParent[] }>(`/school-parents/school/${schoolId}`),

  getById: (schoolId: string, parentId: string) =>
    api.get(`/school-parents/${schoolId}/${parentId}`),

  create: (payload: CreateParentPayload) =>
    api.post<{ data: SchoolParent }>("/school-parents", payload),

  createByUserId: (payload: CreateParentByUserIdPayload) =>
    api.post<{ data: SchoolParent }>("/school-parents/by-user", payload),

  update: (schoolId: string, parentId: string, payload: UpdateParentPayload) =>
    api.patch<{ data: SchoolParent }>(
      `/school-parents/${schoolId}/${parentId}`,
      payload,
    ),

  remove: (schoolId: string, parentId: string) =>
    api.delete(`/school-parents/${schoolId}/${parentId}`),

  removeBulk: (schoolId: string, ids: string[]) =>
    api.post(`/school-parents/delete-bulk/${schoolId}`, { ids }),
};
