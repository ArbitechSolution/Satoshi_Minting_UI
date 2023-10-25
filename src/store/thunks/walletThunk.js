// walletThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the Ethereum network configuration
const ethereumNetworkConfig = {
  chainId: `0x${Number(97).toString(16)}`,
  chainName: "BNB Smart Chain Testnet",
  nativeCurrency: {
    name: "BSC",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: [
    "https://data-seed-prebsc-1-s1.binance.org:8545/",
  ],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

// Redux Thunk for connecting to the wallet
export const connectWallet = createAsyncThunk(
  "wallet/connectWallet",
  async () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");

    try {
      // Check if already connected
      if (window.ethereum.selectedAddress) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        // Check if connected to the desired network
        if (chainId !== ethereumNetworkConfig.chainId) {
          // Add the Ethereum network
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [ethereumNetworkConfig],
          });

          // Switch to the desired network
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethereumNetworkConfig.chainId }],
          });
        }
      } else {
        // Enable Ethereum and get connected accounts
        await window.ethereum.enable();
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      return accounts[0];
    } catch (error) {
      throw error;
    }
  }
);
