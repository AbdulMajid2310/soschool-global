import { api } from "@/lib/axiosInstance";
import {
  CreateParentPayload,
  UpdateParentPayload,
  SchoolParent,
  CreateParentByUserIdPayload,
  ParentStats,
} from "./types";

export const parentApiService = {
  getAll: (schoolId: string) =>
    api.get<{ data: { parents: SchoolParent[]; stats: ParentStats } }>(
      `/school-parents/school/${schoolId}`,
    ),

  getAllGlobal: () =>
    api.get<{ data: { parents: SchoolParent[]; stats: ParentStats } }>(
      `/school-parents`,
    ),

  getById: (schoolId: string, parentId: string) =>
    api.get<{ data: SchoolParent }>(`/school-parents/${schoolId}/${parentId}`),

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

  removeBulk: (schoolId: string, userIds: string[]) =>
    api.delete(`/school-parents/bulk-remove/${schoolId}`, {
      data: { userIds },
    }),
};
