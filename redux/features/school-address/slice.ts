import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { SchoolAddress, SchoolAddressState } from "./types";
import {
  createSchoolAddress,
  getAllSchoolAddresses,
  getSchoolAddressById,
  getSchoolAddressBySchoolId,
  updateSchoolAddress,
  deleteSchoolAddress,
} from "./thunks";

const initialState: SchoolAddressState = {
  address: null,
  addresses: [],
  loading: false,
  error: null,
  success: false,
};

const schoolAddressSlice = createSlice({
  name: "schoolAddress",
  initialState,
  reducers: {
    resetAddressStatus: (state: SchoolAddressState) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
    clearAddressData: (state: SchoolAddressState) => {
      state.address = null;
      state.addresses = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllSchoolAddresses.fulfilled,
        (state: SchoolAddressState, action: PayloadAction<SchoolAddress[]>) => {
          state.loading = false;
          state.addresses = action.payload;
        },
      )
      .addCase(
        deleteSchoolAddress.fulfilled,
        (state: SchoolAddressState, action: PayloadAction<string>) => {
          state.loading = false;
          state.addresses = state.addresses.filter(
            (item: SchoolAddress) => item.schoolAddressId !== action.payload,
          );
          if (state.address?.schoolAddressId === action.payload) {
            state.address = null;
          }
          state.success = true;
        },
      )
      .addMatcher(
        (action: Action) =>
          action.type.startsWith("schoolAddress/") &&
          action.type.endsWith("/pending"),
        (state: SchoolAddressState) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
      )
      .addMatcher(
        (action: Action) =>
          action.type.startsWith("schoolAddress/") &&
          action.type.endsWith("/rejected"),
        (state: SchoolAddressState, action: any) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        },
      )
      .addMatcher(
        (action: Action) =>
          [
            getSchoolAddressById.fulfilled.type,
            getSchoolAddressBySchoolId.fulfilled.type,
          ].includes(action.type),
        (state: SchoolAddressState, action: PayloadAction<SchoolAddress>) => {
          state.loading = false;
          state.address = action.payload;
        },
      )
      .addMatcher(
        (action: Action) =>
          [
            createSchoolAddress.fulfilled.type,
            updateSchoolAddress.fulfilled.type,
          ].includes(action.type),
        (state: SchoolAddressState, action: PayloadAction<SchoolAddress>) => {
          state.loading = false;
          state.address = action.payload;
          state.success = true;
        },
      );
  },
});

export const { resetAddressStatus, clearAddressData } =
  schoolAddressSlice.actions;
export default schoolAddressSlice.reducer;
