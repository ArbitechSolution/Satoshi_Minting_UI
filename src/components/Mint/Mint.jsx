import "./Mint.css";
import React from "react";
import Sky from "../../new logo/sky.png";
import Cloud from "../../new logo/skyhalf.png";
import OpaqueBG from "../../new logo/BGopaqueMint.png";
import Cross from "../../new logo/cross.png";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function Mint() {
  const navigate = useNavigate();
  const { imageURI, id } = useSelector((state) => state.nft.data);

  return (
    <div className="mint_bg">
      <img src={Sky} className="mint_sky sky1" alt="sky" />
      <img src={Cloud} className="mint_sky sky2" alt="cloud" />
      <div className="mint_card_div">
        <img
          src={OpaqueBG}
          style={{ width: "100%", height: "100%" }}
          alt="background"
        />

        <div className="mint_card_content">
          <img
            src={Cross}
            className="mint_card_content_cross_btn"
            onClick={() => {
              navigate("/");
            }}
            alt="cross"
          />
          <h1 className="mint_card_content_heading">congratulation!</h1>
          <p className="mint_card_content_para">You got a plane NFT card !</p>
          <div className="color_splash_bg">
            <div className="mint_card">
              {imageURI ? (
                <>
                  <img
                    src={`../../../100/${id}.png`}
                    className="mint_card_image"
                    alt="plane"
                  />
                  <div
                    className="mint_card_content_bottom"
                    style={
                      imageURI && {
                        border: "1px solid black",
                      }
                    }
                  >
                    <span className="mint_card_content_bottom_para">
                      <p style={{ marginBottom: "-2px" }}>
                        <b>
                          #
                          {id < 9
                            ? "0000" + id
                            : id < 99
                            ? "000" + id
                            : "00" + id}
                        </b>
                      </p>
                      <p>
                        <b>COMMON</b>
                      </p>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="mint_card_image">
                    <div
                      className="skeleton"
                      style={{ borderRadius: "5px" }}
                    ></div>
                  </div>
                  <div className="mint_card_content_bottom">
                    <span
                      className="mint_card_content_bottom_para"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "120px", height: "13px" }}>
                        <div className="skeleton"></div>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          height: "13px",
                          marginTop: "5px",
                        }}
                      >
                        <div className="skeleton"></div>
                      </div>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;
