// store.js
import { configureStore } from "@reduxjs/toolkit";
import { walletReducer } from "./slices/walletSlice";
import { nftReducer } from "./slices/nftSlice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    nft: nftReducer,
  },
  // Other store configuration options
});

export default store;
