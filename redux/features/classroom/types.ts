export interface SchoolClassroom {
  schoolClassroomId: string;
  name: string;
  major: string;
  createdAt?: string;
}

export interface ClassroomState {
  classrooms: SchoolClassroom[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface CreateClassroomPayload {
  name: string;
  major: string | null,
  schoolId: string;
}

export interface UpdateClassroomPayload {
  id: string;
  schoolId: string;
  name: string;
  major: string | null;
}

export interface DeleteClassroomPayload {
  id: string;
  schoolId: string;
}