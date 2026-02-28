// src/redux/features/study_material/types.ts
export interface StudyMaterial {
    studyMaterialId: string;
    title: string;
    description: string;
    fileUrl: string;
    subject?: any;
    author?: any;
    period?: any;
}

export interface CreateStudyMaterialDto {
    title: string;
    description?: string;
    file: File;
    subjectId: string;
    authorId: string;
    periodId: string;
}

export interface UpdateStudyMaterialDto extends Partial<CreateStudyMaterialDto> {
    studyMaterialId: string;
}

export interface StudyMaterialState {
    materials: StudyMaterial[];
    selectedMaterial: StudyMaterial | null; // Untuk fungsi findOne
    loading: boolean;
    isSubmitting: boolean;
    error: string | null;
}