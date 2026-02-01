// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducerAuth from './features/auth/slice';

export const store = configureStore({
  reducer: {
    auth: profileReducerAuth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;