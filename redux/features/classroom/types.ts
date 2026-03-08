export interface SchoolClassroom {
  schoolClassroomId: string;
  name: string;
  major: string;
  level: string;
  capacity: number;
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
  major: string | null;
  level: string;
  capacity: number;
  schoolId: string;
}

export interface UpdateClassroomPayload {
  id: string;
  schoolId: string;
  level: string;
  name: string;
  capacity: number;
  major: string | null;
}

export interface DeleteClassroomPayload {
  id: string;
  schoolId: string;
}
