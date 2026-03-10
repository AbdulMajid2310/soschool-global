import { api } from "@/lib/axiosInstance";
import { CreateStaffPayload } from "./types";

export const staffService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/school-staffs/school/${schoolId}`);
    return response.data;
  },

  async getOne(schoolId: string, staffId: string) {
    const response = await api.get(
      `/school-staffs/school/${schoolId}/${staffId}`,
    );
    return response.data;
  },

  async create(payload: CreateStaffPayload) {
    const response = await api.post("/school-staffs", payload);
    return response.data;
  },

  async createBulk(schoolId: string, staffs: any[]) {
    const response = await api.post(`/school-staffs/bulk/${schoolId}`, {
      staffs,
    });
    return response.data;
  },

  async update(
    schoolId: string,
    staffId: string,
    data: Partial<CreateStaffPayload>,
  ) {
    const response = await api.patch(
      `/school-staffs/school/${schoolId}/${staffId}`,
      data,
    );
    return response.data;
  },

  async updateStatus(staffId: string, isActive: boolean) {
    const response = await api.patch(`/school-staffs/${staffId}/status`, {
      isActive,
    });
    return response.data;
  },

  async delete(schoolId: string, staffId: string) {
    const response = await api.delete(
      `/school-staffs/school/${schoolId}/${staffId}`,
    );
    return response.data;
  },

  // Fitur Hapus Massal Baru
  async deleteBulk(schoolId: string, userIds: string[]) {
    const response = await api.delete(
      `/school-staffs/bulk-remove/${schoolId}`,
      {
        data: { userIds }, // Ingat: Axios DELETE payload harus dalam properti 'data'
      },
    );
    return response.data;
  },

  async importCsv(schoolId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(
      `/school-staffs/import-csv/${schoolId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },
};
