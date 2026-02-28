import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  getFilteredUsers
} from './thunk';

const initialState: UserState = {
  users: [],
  userDetail: null,
  filteredUsers: [],
  stats: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserDetail: (state) => {
      state.userDetail = null;
    },
    clearFilteredUsers: (state) => {
      state.filteredUsers = [];
    },
    resetUserState: (state) => {
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder

      /* ============================
           FETCH FILTERED USERS (School Context)
           ============================ */
      .addCase(getFilteredUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilteredUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredUsers = action.payload.data; // Simpan hasil ke state baru
      })
      .addCase(getFilteredUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* ============================
         FETCH MONITORING STATS 
         ============================ */
      .addCase(getUserStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data; // Simpan data statistik ke state
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ============================
         FETCH ALL USERS 
         ============================ */
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ============================
         FETCH USER BY ID 
         ============================ */
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ============================
         CREATE, UPDATE, DELETE 
         (Loading handling)
         ============================ */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { clearUserDetail, resetUserState } = userSlice.actions;
export default userSlice.reducer;