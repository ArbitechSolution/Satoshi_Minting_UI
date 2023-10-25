import React from "react";

function MY_NFT_CARD({ card: { img, num } }) {
  return (
    <div className="Single_CARD">
      <img
        src={`../../../100/${num}.png`}
        className="Single_CARD_IMAGE"
        alt="card"
      />
      <div className="Single_CARD_CONTENT">
        <div className="Single_CARD_CONTENT_PARA">
          <p style={{ marginBottom: "-2px" }}>
            <b>
              #{num < 10 ? "0000" + num : num < 100 ? "000" + num : "00" + num}
            </b>
          </p>
          <p>
            <b>COMMON</b>
          </p>
        </div>
        {/* <span className='Single_CARD_CONTENT_BTN_DIV'>
        <button className='Single_CARD_CONTENT_BTN'>Transfer</button>
        </span> */}
      </div>
    </div>
  );
}

export default MY_NFT_CARD;
