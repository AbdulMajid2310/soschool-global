import { createSlice } from '@reduxjs/toolkit';
import { AddressState } from './types';
import { fetchAddresses, createAddress, deleteAddress, updateAddress, fetchAddressByUserId, fetchAddressBySchoolId } from './thunk';

const initialState: AddressState = {
  addresses: [],
  address: null,
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })

      // Update
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Gunakan addressId sesuai backend
        const index = state.addresses.findIndex(addr => addr.addressId === action.payload.addressId);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        state.address = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete
      .addCase(deleteAddress.fulfilled, (state, action) => {
        // action.payload di sini adalah ID yang kita return dari thunk
        state.addresses = state.addresses.filter(a => a.addressId !== action.payload);
      })

      // Fetch By User ID
      .addCase(fetchAddressByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchAddressByUserId.rejected, (state, action) => {
        state.loading = false;
        state.address = null; // Kosongkan jika tidak ada
        state.error = action.payload as string;
      })

      // Fetch By School ID
      .addCase(fetchAddressBySchoolId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressBySchoolId.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchAddressBySchoolId.rejected, (state, action) => {
        state.loading = false;
        state.address = null;
        state.error = action.payload as string;
      })
  },
});

export const { clearAddressError, setAddress } = addressSlice.actions;
export default addressSlice.reducer;