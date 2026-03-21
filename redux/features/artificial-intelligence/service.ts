import { api } from "@/lib/axiosInstance";
import { GenerateMaterialRequest, GenerateSubjectRequest } from "./types";

export const aiService = {
  // POST ke /api/artificial-intelligence/material-description
  generateMaterial: (data: GenerateMaterialRequest) =>
    api.post("/artificial-intelligence/material-description", data),

  // POST ke /api/artificial-intelligence/subject-summary
  generateSubject: (data: GenerateSubjectRequest) =>
    api.post("/artificial-intelligence/subject-summary", data),
};
