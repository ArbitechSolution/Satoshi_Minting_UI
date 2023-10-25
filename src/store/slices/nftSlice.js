import { createSlice } from "@reduxjs/toolkit";
import {
  mintingLimit,
  mintNFT,
  walletOfOwner,
  getTotalSupply,
} from "../thunks/nftThunks";

const nftSlice = createSlice({
  name: "nft",
  initialState: {
    limit: null,
    totalSupply: null,
    data: {
      id: null,
      imageURI: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    clearNFTData: (state) => {
      state.data = {
        id: null,
        imageURI: null,
      };
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mintingLimit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(mintingLimit.fulfilled, (state, action) => {
        state.limit = action.payload;
        state.isLoading = false;
      })
      .addCase(mintingLimit.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });

    builder
      .addCase(mintNFT.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(mintNFT.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(mintNFT.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });

    builder
      .addCase(walletOfOwner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(walletOfOwner.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(walletOfOwner.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });

    builder
      .addCase(getTotalSupply.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTotalSupply.fulfilled, (state, action) => {
        state.totalSupply = action.payload;
        state.isLoading = false;
      })
      .addCase(getTotalSupply.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const nftReducer = nftSlice.reducer;

export const { clearNFTData } = nftSlice.actions;
