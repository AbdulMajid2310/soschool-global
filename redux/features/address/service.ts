import { api } from "@/lib/axiosInstance";
import { Address } from "./types";

export const addressService = {
  getAll: () => api.get("/addresses"),

  getById: (id: string) => api.get(`/addresses/${id}`),

  getByUserId: (userId: string) => api.get(`/addresses/user/${userId}`),

  getBySchoolId: (schoolId: string) => api.get(`/addresses/school/${schoolId}`),

  create: (data: Partial<Address>) => api.post("/addresses", data),

  update: (id: string, data: Partial<Address>) =>
    api.patch(`/addresses/${id}`, data),

  remove: (id: string) => api.delete(`/addresses/${id}`),
};
