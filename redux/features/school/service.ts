import { api } from "@/lib/axiosInstance";
import {
  School,
  CreateSchoolRequest,
  UpdateSchoolRequest,
  SummarySchool,
} from "./types";

const schoolService = {
  // service.ts

  create: async (data: CreateSchoolRequest): Promise<School> => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          key !== "avatar" &&
          key !== "background"
        ) {
          formData.append(key, String(value));
        }
      });

      if (data.avatar) formData.append("avatar", data.avatar);
      if (data.background) formData.append("background", data.background);

      const response = await api.post("/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.data.message;
        throw Array.isArray(serverMessage)
          ? serverMessage.join(", ")
          : serverMessage || "Gagal mendaftarkan sekolah";
      } else if (error.request) {
        console.error("No Response from server:", error.request);
        throw "Server tidak merespon";
      } else {
        console.error("Request Setup Error:", error.message);
        throw error.message;
      }
    }
  },

  getAll: async (): Promise<School[]> => {
    const response = await api.get("/schools");
    return response.data.data;
  },

  getSummarySchool: async (schoolId: string): Promise<SummarySchool> => {
    const response = await api.get(`/schools/${schoolId}/summary`);
    return response.data.data;
  },

  getById: async (schoolId: string): Promise<School> => {
    const response = await api.get(`/schools/${schoolId}`);
    return response.data.data;
  },

  updateSchoolStatus: async (id: string, isActive: boolean) => {
    const response = await api.patch(`/schools/${id}/status`, { isActive });
    return response.data;
  },

  // ... di dalam object schoolService
  update: async (
    schoolId: string,
    data: UpdateSchoolRequest,
  ): Promise<School> => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        // Jika value adalah File, atau string/number yang valid
        if (
          value !== undefined &&
          value !== null &&
          key !== "avatar" &&
          key !== "background"
        ) {
          formData.append(key, String(value));
        }
      });

      if (data.avatar instanceof File) formData.append("avatar", data.avatar);
      if (data.background instanceof File)
        formData.append("background", data.background);

      const response = await api.patch(`/schools/${schoolId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      throw Array.isArray(serverMessage)
        ? serverMessage.join(", ")
        : serverMessage || "Gagal memperbarui sekolah";
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/schools/${id}`);
  },
};

export default schoolService;
