import { contractABI, contractAddress } from "../../utils/NftContract";
import Web3 from "web3";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(contractABI, contractAddress);

const mintingLimit = createAsyncThunk("nft/mintingLimit", async () => {
  try {
    const limit = await contract.methods.minting_Limit().call();

    return limit;
  } catch (error) {
    throw error;
  }
});

const getTotalSupply = createAsyncThunk("nft/totalSupply", async () => {
  try {
    const totalSupply = await contract.methods.totalSupply().call();
    return totalSupply;
  } catch (error) {
    throw error;
  }
});

const walletOfOwner = createAsyncThunk(
  "nft/walletOfOwner",
  async ({ address }) => {
    try {
      const wallet = await contract.methods.WalletOfOwner(address).call();

      if (wallet.length === 0) {
        return [];
      }

      const tokenURI = await contract.methods
        .tokenURI(wallet[wallet.length - 1])
        .call();

      console.log(tokenURI);

      const response = await axios.get(
        tokenURI
        // {
        // headers: {
        //   Origin: "http://mint.satoshiair.xyz",
        // },}
      );

      console.log(response);

      return {
        id: response.data.edition,
        imageURI: response.data.image,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const mintNFT = createAsyncThunk(
  "nft/mintNFT",
  async ({ address, amount, limit }) => {
    try {
      const totalMinted = await contract.methods.getTotalMint(address).call();

      if (parseInt(totalMinted) >= parseInt(limit)) {
        throw new Error("Mint limit exceeded");
      }

      // whitelist
      const isWhitelisted = await contract.methods.getWhitelist(address).call();

      if (!isWhitelisted) {
        throw new Error("You are not whitelisted");
      }

      console.log({
        address,
        amount,
        limit,
        totalMinted,
        isWhitelisted,
      });

      const tx = await contract.methods.mint(amount).send({
        from: address,
      });

      return tx;
    } catch (error) {
      throw error;
    }
  }
);

export { mintingLimit, mintNFT, walletOfOwner, getTotalSupply };
