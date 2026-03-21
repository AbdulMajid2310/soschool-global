// path: @/hooks/useAuthContext.ts

import { useAppSelector } from "@/redux/hooks";

/**
 * Mendapatkan ID User (General)
 */
export const useUserId = () => {
  const userId = useAppSelector((state) => state.auth.profile?.user.userId);
  return userId;
};

/**
 * Mendapatkan ID Sekolah yang sedang aktif
 */
export const useSchoolId = () => {
  const { profile } = useAppSelector((state) => state.auth);
  return profile?.activeContext?.schoolId || sessionStorage.getItem("schoolId");
};

/**
 * Mendapatkan ID Guru (Jika user adalah Teacher)
 */
export const useTeacherId = () => {
  const teacher = sessionStorage.getItem("teacherId");
  return teacher;
};

/**
 * Mendapatkan ID Staff (Jika user adalah Staff)
 */
export const useStaffId = () => {
  const staff = sessionStorage.getItem("staffId");
  return staff;
};

/**
 * Mendapatkan ID Siswa (Jika user adalah Student)
 */
export const useStudentId = () => {
  const student = sessionStorage.getItem("studentId");
  return student;
};

/**
 * Mendapatkan ID Orang Tua (Jika user adalah Parent)
 */
export const useParentId = () => {
  const parent = sessionStorage.getItem("parentId");
  return parent;
};
