import { api } from "@/lib/axiosInstance";
import { CreateStudentPayload } from "./types";

export const studentService = {
  async getBySchool(schoolId: string) {
    const response = await api.get(`/school-students/school/${schoolId}`);
    return response.data; // Mengasumsikan return: { data: [...], message: "..." }
  },

  async create(payload: CreateStudentPayload) {
    const response = await api.post("/school-students", payload);
    return response.data;
  },

  // Di dalam objek API service kamu
  async delete(schoolId: string, studentId: string) {
    // Kita kirim ke endpoint bulk, tapi array-nya cuma isi satu ID
    const response = await api.delete(`/school-students/bulk/${schoolId}`, {
      data: {
        studentIds: [studentId], // Dibungkus array agar cocok dengan DTO Backend
      },
    });
    return response.data;
  },

  async deleteBulk(schoolId: string, studentIds: string[]) {
    const response = await api.delete(`/school-students/bulk/${schoolId}`, {
      data: { studentIds },
    });
    return response.data;
  },

  async update(studentId: string, data: any) {
    const response = await api.put(`/school-students/${studentId}`, data);
    return response.data;
  },
};
