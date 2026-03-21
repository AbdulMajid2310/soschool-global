// src/redux/features/study_material/service.ts
import { api } from "@/lib/axiosInstance";
import { CreateStudyMaterialDto, UpdateStudyMaterialDto } from "./types";

export const studyMaterialService = {
  async create(formData: FormData) {
    const response = await api.post("/study-materials", formData);
    return response.data;
  },

  async createBulk(formData: FormData) {
    const response = await api.post("/study-materials/bulk", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async findBySubject(subjectId: string) {
    const response = await api.get(`/study-materials/subject/${subjectId}`);
    return response.data;
  },

  async findOne(studyMaterialId: string) {
    const response = await api.get(`/study-materials/${studyMaterialId}`);
    return response.data;
  },

  async update(payload: UpdateStudyMaterialDto) {
    const { studyMaterialId, ...data } = payload;
    const response = await api.patch(
      `/study-materials/${studyMaterialId}`,
      data,
    );
    return response.data;
  },

  async delete(studyMaterialId: string) {
    const response = await api.delete(`/study-materials/${studyMaterialId}`);
    return response.data;
  },
};
