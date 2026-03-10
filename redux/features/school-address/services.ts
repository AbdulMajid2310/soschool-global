import { api } from "@/lib/axiosInstance";
import { CreateSchoolAddressDto, UpdateSchoolAddressDto } from "./types";

export const schoolAddressService = {
  create: (dto: CreateSchoolAddressDto) => api.post("/school-addresses", dto),

  findAll: () => api.get("/school-addresses"),

  findById: (id: string) => api.get(`/school-addresses/${id}`),

  findBySchool: (schoolId: string) =>
    api.get(`/school-addresses/school/${schoolId}`),

  update: (id: string, dto: UpdateSchoolAddressDto) =>
    api.patch(`/school-addresses/${id}`, dto),

  remove: (id: string) => api.delete(`/school-addresses/${id}`),
};
