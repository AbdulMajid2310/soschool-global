import { School } from "../school/types";
import { User } from "../user/types";

export interface SchoolDocument {
  schoolDocumentId: string;
  title: string;
  category: string;
  refNumber?: string;
  status: string;
  announcement: string;
  fileUrl?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  school?: School;
  user?: User;
}

export interface SchoolDocumentQuery {
  schoolId?: string;
  category?: string;
  status?: string;
}

export interface SchoolDocumentResponse {
  success: boolean;
  message: string;
  data: SchoolDocument[];
}

export interface SingleSchoolDocumentResponse {
  success: boolean;
  message: string;
  data: SchoolDocument;
}

export interface DocumentState {
  documents: SchoolDocument[];
  document: SchoolDocument | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
