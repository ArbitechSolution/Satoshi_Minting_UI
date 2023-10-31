// walletThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the Ethereum network configuration
const ethereumNetworkConfig = {
  chainId: `0x${Number(42161).toString(16)}`,
  chainName: "Arbitrum One",
  nativeCurrency: {
    symbol: "ETH",
    decimals: 18,
  },

  rpcUrls: [
    "https://arb1.arbitrum.io/rpc",
    "https://arbitrum.llamarpc.com",
    "https://arb2.arbitrum.io/rpc",
    "https://1rpc.io/arb",
    "https://arb-mainnet-public.unifra.io",
    "https://arbitrum-one.publicnode.com",
    "https://arbitrum.meowrpc.com",
  ],
  blockExplorerUrls: ["https://arbiscan.io/"],
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
