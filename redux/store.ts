// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducerAuth from './features/auth/slice';
import roleSlice from './features/userRole/slice'
import userSlice from './features/user/slice'
import userAccessSlice from './features/user-access/slice'
import schoolSlice from './features/school/slice'

export const store = configureStore({
  reducer: {
    auth: profileReducerAuth,
    users: userSlice,
    userRole: roleSlice,
    userAccess: userAccessSlice,
    school: schoolSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;