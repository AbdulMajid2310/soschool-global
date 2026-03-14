import { api } from "@/lib/axiosInstance";
import {
  SchoolDocumentQuery,
  SchoolDocumentResponse,
  SingleSchoolDocumentResponse,
} from "./types";

const getDocuments = async (
  params?: SchoolDocumentQuery,
): Promise<SchoolDocumentResponse> => {
  const response = await api.get("/school-documents", { params });
  return response.data;
};

const getDocumentById = async (
  id: string,
): Promise<SingleSchoolDocumentResponse> => {
  const response = await api.get(`/school-documents/${id}`);
  return response.data;
};

const createBulkDocuments = async (
  formData: FormData,
): Promise<SchoolDocumentResponse> => {
  const response = await api.post("/school-documents/bulk", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const updateDocument = async (
  id: string,
  formData: FormData,
): Promise<SingleSchoolDocumentResponse> => {
  const response = await api.patch(`/school-documents/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const deleteDocument = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/school-documents/${id}`);
  return response.data;
};

const schoolDocumentService = {
  getDocuments,
  getDocumentById,
  createBulkDocuments,
  updateDocument,
  deleteDocument,
};

export default schoolDocumentService;
