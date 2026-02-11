export interface SchoolPeriod {
  periodId: string;
  academicYear: string;
  semester: 'GANJIL' | 'GENAP';
  isActive: boolean;
  schoolId: string;
}

export interface CreateSchoolPeriod {
  academicYear: string;
  semester: 'GANJIL' | 'GENAP';
  schoolId: string;
}



export interface SchoolPeriodState {
  periods: SchoolPeriod[];
  activePeriod: SchoolPeriod | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ToggleActivePayload {
  id: string;
  schoolId: string;
}