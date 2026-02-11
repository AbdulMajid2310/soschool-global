// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducerAuth from './features/auth/slice';
import roleSlice from './features/userRole/slice'
import userSlice from './features/user/slice'
import userAccessSlice from './features/user-access/slice'
import schoolSlice from './features/school/slice'
import schoolAddressSlice from './features/address/slice'
import studentSlice from './features/student/slice'
import classroomSlice from './features/classroom/slice'
import teacherSlice from './features/teacher/slice'
import classroomConfigSlice from './features/classroom-config/slice'
import schoolPeriodSlice from './features/school-period/slice'
import schoolSubjectSlice from './features/school_subject/slice'
import schoolStudyMaterialSlice from './features/school_study_material/slice'
import schoolScheduleSlice from './features/school_schedule/slice'

export const store = configureStore({
  reducer: {
    auth: profileReducerAuth,
    users: userSlice,
    userRole: roleSlice,
    userAccess: userAccessSlice,
    school: schoolSlice,
    schoolAddress: schoolAddressSlice,
    student: studentSlice,
    classroom: classroomSlice,
    teacher: teacherSlice,
    classroomConfig: classroomConfigSlice,
    schoolPeriod: schoolPeriodSlice,
    schoolSubject: schoolSubjectSlice,
    schoolStudyMaterial: schoolStudyMaterialSlice,
    schoolSchedule: schoolScheduleSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;