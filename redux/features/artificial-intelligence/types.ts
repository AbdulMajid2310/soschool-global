export interface MaterialItem {
  title: string;
  description: string;
  fileUrl?: string;
}

export interface GenerateMaterialRequest {
  title: string;
  fileUrl?: string;
}

export interface GenerateSubjectRequest {
  subjectName: string;
  materials: MaterialItem[];
}

export interface AiState {
  materialDescription: string | null;
  subjectSummary: string | null;
  loading: boolean;
  error: string | null;
}
