import React from "react";
import "./AdContainer.css";
import ad1 from "../assets/ads/roneAd1.jpeg";
import ad2 from "../assets/ads/roneAd2.jpeg";

const AdContainer = () => {
  return (
    <div className="adContainer">
      <div
        style={{ backgroundImage: `url(${ad1})` }}
        className="leftAdContainer adCard"
      ></div>
      <div
        style={{ backgroundImage: `url(${ad2})` }}
        className="rightAdContainer adCard"
      ></div>
    </div>
  );
};

export default AdContainer;
