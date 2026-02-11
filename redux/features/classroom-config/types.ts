import { SchoolClassroom } from "../classroom/types";
import { SchoolPeriod } from "../school-period/types";
import { Student } from "../student/types";
import { SchoolTeacher } from "../teacher/types";

export interface classroomCobfigData {
    classroomConfigId: string
    student: Student
    status: string
}

export interface ClassroomConfig {
    classroomConfigId: string;
    roomLocation: string;
    period: SchoolPeriod;
    classroom: SchoolClassroom;
    homeroomTeacher: SchoolTeacher;
    classroomStudents: classroomCobfigData[];
}

export interface CreateClassroomConfigPayload {
    roomLocation: string;
    periodId: string;
    schoolClassroomId: string;
    homeroomTeacherId: string;
    studentIds: string[];
    schoolId: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}