import { SchoolClassroom } from "../classroom/types";

export interface Subject {
    subjectId: string;
    name: string;
    description: string;
    code: string;
    level: string;
    category: string;
    schoolId: string;
    classroom: SchoolClassroom
    materials?: any[]; // Relasi ke materi
}

export interface SubjectState {
    subjects: Subject[];
    currentSubject: Subject | null;
    loading: boolean;
    error: string | null;
    isSubmitting: boolean;
}

export interface CreateSubjectPayload {
    name: string;
    description?: string;
    code: string;
    category: string;
    schoolId: string;
    schoolClassroomId: string;
}

export interface UpdateSubjectPayload extends Partial<CreateSubjectPayload> {
    subjectId: string;
}