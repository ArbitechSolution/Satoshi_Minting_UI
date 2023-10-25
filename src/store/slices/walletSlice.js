// walletSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { connectWallet } from '../thunks/walletThunk';

const initialState = {
  connectedAccount: null,
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.connectedAccount = action.payload;
        state.isLoading = false;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const walletReducer = walletSlice.reducer;
