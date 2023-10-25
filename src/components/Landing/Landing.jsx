import { useNavigate } from "react-router-dom";
import "./Landing.css";
import React, { useState, useEffect } from "react";
import Sky from "../../new logo/sky.png";
import SkyHalf from "../../new logo/skyhalf.png";
import Plane from "../../new logo/plane.png";
import Plus from "../../new logo/Group 777.png";
import Minus from "../../new logo/Group 778.png";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { connectWallet } from "../../store/thunks/walletThunk";
import {
  mintingLimit,
  mintNFT,
  walletOfOwner,
  getTotalSupply,
} from "../../store/thunks/nftThunks";

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const acc = useSelector((state) => state.wallet.connectedAccount);
  const { limit, totalSupply } = useSelector((state) => state.nft);

  useEffect(() => {
    dispatch(mintingLimit());
    dispatch(getTotalSupply());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnectWallet = () => {
    dispatch(connectWallet());
  };

  useEffect(() => {
    if (!acc) return;
    dispatch(walletOfOwner({ address: acc }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acc]);
  const handleMint = async () => {
    if (!acc) {
      toast.error("Please connect wallet");
      return;
    }

    if (value === "" || value <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const result = await dispatch(
        mintNFT({ address: acc, amount: value, limit: limit })
      );

      if (mintNFT.fulfilled.match(result)) {
        dispatch(walletOfOwner({ address: acc }));
        toast.success("Minting successful");
        setTimeout(() => {
          navigate("/mint");
        }, 1000);
      } else if (mintNFT.rejected.match(result)) {
        const error = result.error;
        if (error.message === "Mint limit exceeded") {
          toast.error("Mint limit exceeded");
        } else if (error.message === "You are not whitelisted") {
          toast.error("You are not whitelisted");
        } else {
          toast.error("Minting failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during minting");
    }
  };

  return (
    <div className="loginBG">
      <br />
      <div className="loginCard">
        <h2 className="loginCardHeading">Mint your Plane for future reward!</h2>
        {/* <p className="loginCardPara">{id? id : 'id'}{imageURI?imageURI :'no uri'}</p> */}
        <h1 className="loginCardStats">{totalSupply}/100</h1>
        <form
          className="loginCardForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src={Plus}
            className="plusminus"
            onClick={() => {
              if (value < limit) setValue(value + 1);
            }}
            alt="plus"
          />
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            max={limit}
            min={1}
          />
          <img
            src={Minus}
            className="plusminus"
            onClick={() => {
              if (value > 1) setValue(value - 1);
            }}
            alt="minus"
          />
        </form>
        {/* <p className="loginCardPara Para1">Total: 0.2 BNB</p> */}
        {/* <p className="loginCardPara Para2">{limit} max</p> */}
        <button className="loginCardButton" onClick={handleConnectWallet}>
          {acc
            ? acc.slice(0, 4) + "..." + acc.slice(acc.length - 4)
            : "Connect Wallet"}
        </button>
        <div className="loginCardButtonsDiv">
          <button className="loginCardButton B" onClick={handleMint}>
            mint
          </button>
          <button
            className="loginCardButton B"
            onClick={() => {
              navigate("/myNFT");
            }}
          >
            my nft
          </button>
        </div>

        <img src={Plane} className="loginCardBgPIC1" alt="plane" />
        <img src={Sky} className="loginCardBgPIC2" alt="sky" />
        <img src={SkyHalf} className="loginCardBgPIC3" alt="sky_2" />
      </div>
    </div>
  );
}

export default Landing;
