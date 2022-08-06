import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./QrScan.css";
import bg from "../assets/settingsBg.png";
import QRCode from 'qrcode.react';


const QrScan = () => {
  const [userName, setUserName] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    const useName = localStorage.getItem("username");
    setUserName(useName);

    const endpoint = "https://ronedcard.com/profile/share";
    let originForShare = new URL(endpoint);
    originForShare.searchParams.set("user", userName);

    if (userName !== "") {
      setOrigin(originForShare.href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `${userName}_QR_Code.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  return (
    <div className="settingsPage qrSettings">
      <Header />
      <div
        className="bgContainer__settings"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2>Settings</h2>
        <div className="formContainer__settings">
          <div className="titleContainer__formContainer">
            <Link
              to="/settings/profile"
              className=" titleHeaderlink mainSettings"
            >
              Profile
            </Link>
            <Link to="/settings/Accont" className="accountSettings titleHeaderlink">Account</Link>
            <Link
              to="/settings/Wallet"
              className=" titleHeaderlink walletSettings"
            >
              Wallet
            </Link>
            <Link to="/settings/QR-code" className="activeHeaderQr">
              QR Code
            </Link>
          </div>
          <div className="QrContent__container">
            <div className="qrContainer__wallet webViewConatiner">
            <QRCode
        id="qrCodeEl"
        size={300}
        value={origin}
      />
              <div onClick={downloadQRCode} className="shareThisqr__button scanQr__container">
                Download QR
              </div>
            </div>
            <div className="qrContainer__wallet mobileViewConatiner">
            <QRCode
        id="qrCodeEl"
        size={200}
        value={origin}
      />
              <div onClick={downloadQRCode} className="shareThisqr__button scanQr__container">
                Download QR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrScan;
