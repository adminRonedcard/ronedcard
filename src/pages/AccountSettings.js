import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import qrcode from "../assets/qrImage.jpeg";
import "./ProfileSettings.css";
import Resizer from "react-image-file-resizer";

const AccountSettings = () => {
  const [id, setId] = useState("");
  /* const [apiKey, setApiKey] = useState("");
    const [secretKey, setSecretKey] = useState(""); */
  const [imageFile, setImageFile] = useState("");
  const [upi, setUpi] = useState("");

  useEffect(() => {
    var newid = localStorage.getItem("newuserid");
    setId(newid);
  }, []);

  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          200,
          200,
          "JPEG",
          100,
          0,
          (uri) => {
            setImageFile(uri);
            console.log(uri);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (imageFile !== "") {
      document.getElementById("imageQRConatiner").style.display = "flex";
    }
  }, [imageFile]);

  const storeValues = () => {
    /*  setApiKey(document.getElementById("api_key").value);
        setSecretKey(document.getElementById("secret_key").value); */
    setUpi(document.getElementById("upi_id").value);
  };

  /* async function saveClick() {
        if(apiKey !== "" && secretKey !== "") {
            let url = "https://data-totality-351315.uc.r.appspot.com/credentials";
    
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  userId: id,
                  apikey: apiKey,
                  apisecret: secretKey,
              }),
            });
            const data = await response.json();
            console.log(data);
            if(data.status === 200) {
                window.location.href = '/profile'
            }
            
          }
        } */

  async function saveClick() {
    document.getElementById("saveQRLoader").style.display = "block";
    document.getElementById("saveQrText").style.display = "none";
    if (upi !== "" && imageFile !== "") {
      const endpoint = "http://localhost:5001/account/save_details";
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          accountDetails: {
            upi_Id: upi,
            QrCode: imageFile,
          },
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        window.location.href = "/profile";
      }
    } else {
      document.getElementById("saveQRLoader").style.display = "none";
      document.getElementById("saveQrText").style.display = "block";
      document.getElementById("errorSaveQr").style.display = "block";
    }
  }

  return (
    <div className="settingsPage">
      <Header />
      <div
        className="bgContainer__settings"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2>Account</h2>
        <div className="formContainer__settings">
          <div className="titleContainer__formContainer">
            <Link
              to="/settings/profile"
              className="mainSettings titleHeaderlink"
            >
              Profile
            </Link>
            <p className="activeHeaderAccount titleHeaderlink">Account</p>
            <Link
              to="/settings/Wallet"
              className="walletSettings titleHeaderlink"
            >
              Wallet
            </Link>
            <Link
              to="/settings/QR-code"
              className="themesSettings titleHeaderlink"
            >
              QR Code
            </Link>
          </div>
          <div className="profileImageContainer__form__update">
            <div className="inputboxContainers__update">
              <form autoComplete="off" className="form__update">
                {/* <fieldset className="input__container__form__update">
                  <legend>API KEY*</legend>
                  <div className="input__box__form__update">
                    <input
                    onChange={storeValues}
                      id="api_key"
                      type="text"
                      name="apiKey"
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>SECRET KEY*</legend>
                  <div className="input__box__form__update">
                    <input
                     onChange={storeValues}
                      id="secret_key"
                      type="text"
                      name="secretKey"
                    />
                  </div>
                </fieldset> */}

                <div className="qrCodeContainerUpi">
                  <div className="imageQrConatiner" id="imageQRConatiner">
                    <img src={imageFile !== "" ? imageFile : ""} alt="" />
                  </div>
                  <div className="AddPhotosButton uploadQr">
                    <input
                      name="file"
                      id="inpFile"
                      accept=".png"
                      type="file"
                      onChange={fileChangedHandler}
                    />
                    <img src={qrcode} alt="" />
                    Upload QR CODE
                  </div>
                </div>

                <fieldset className="input__container__form__update">
                  <legend>UPI ID*</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="upi_id"
                      type="text"
                      name="upiId"
                    />
                  </div>
                </fieldset>
                <p id="errorSaveQr" className="errorSaveQr">
                  Upload QR and UPI ID
                </p>
                <div onClick={saveClick} className="updateProfileButton">
                  <div className="loader__container__login" id="saveQRLoader">
                    <PulseLoader color="#ffffff" />
                  </div>
                  <p id="saveQrText">SAVE</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footerContainerProfileSettings">
        <Footer />
      </div> */}
    </div>
  );
};

export default AccountSettings;
