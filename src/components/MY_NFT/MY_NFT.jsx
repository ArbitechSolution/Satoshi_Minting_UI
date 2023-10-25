import "./MY_NFT.css";
import React from "react";
import CloudLeft from "../../new logo/cloudleft.png";
import CloudRight from "../../new logo/cloudright.png";
import OpaqueBG from "../../new logo/backgroundOpacity.png";
import Cross from "../../new logo/cross.png";
import MY_NFT_CARD from "./MY_NFT_CARD";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MY_NFT() {
  const { id, imageURI } = useSelector((state) => state.nft.data);
  const acc = useSelector((state) => state.wallet.connectedAccount);

  const navigate = useNavigate();
  return (
    <div className="NFT_BG">
      <img src={CloudLeft} className="NFT_BG_CLOUDS CLOUD1" alt="cloud" />
      <img src={CloudRight} className="NFT_BG_CLOUDS CLOUD2" alt="cloud_2" />
      <div className="NFT_CARDS">
        <img
          src={OpaqueBG}
          style={{ width: "100%", height: "100%" }}
          alt="background"
        />

        <div className="NFT_CARD_CONTENT">
          <img
            src={Cross}
            className="NFT_CARD_CONTENT_CROSS_BTN"
            onClick={() => {
              navigate("/");
            }}
            alt="cross"
          />
          <h1 className="NFT_CARD_HEADING">My nft</h1>
          <br />
          <br />

          {!acc ? (
            <div className="nft-message">
              <span>Connect wallet to view your NFTs</span>
            </div>
          ) : imageURI ? (
            <div className="CARDS_DIV">
              <MY_NFT_CARD
                card={{
                  img: imageURI,
                  num: id,
                }}
              />
            </div>
          ) : (
            <div className="nft-message">
              <span>No NFTs minted yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MY_NFT;
