import React, { useEffect, useState } from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");

  const storeOtp = () => {
    setOtp(document.getElementById("otp").value);
  };

  useEffect(() => {
    window.onbeforeunload = function (e) {
      window.onunload = function () {
        window.localStorage.isMySessionActive = "false";
      };
      return undefined;
    };
    window.onload = function () {
      window.localStorage.isMySessionActive = "true";
    };
    var newtoken = localStorage.getItem("tokenFromEmail");
    setToken(newtoken);
  }, []);

  async function handleSubmit() {
    document.getElementById("loaderVerifyRegister").style.display = "block";
    document.getElementById("veryfyRegister").style.display = "none";

    let url = new URL(
      "https://ronedcard.herokuapp.com/otp_verification_for_email"
    );
    url.search = new URLSearchParams({
      otp: otp,
    });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await res.json();
    if (data.status === 200) {
      document.getElementById("loaderVerifyRegister").style.display = "none";
      document.getElementById("veryfyRegister").style.display = "block";
      window.location.href = "/register";
    } else if (data === 404) {
      document.getElementById("loaderVerifyRegister").style.display = "none";
      document.getElementById("veryfyRegister").style.display = "block";
      document.getElementById("errorVarifyOtp").innerHTML = "invalid OTP";
      document.getElementById("errorVarifyOtp").style.display = "block";
    } else if (data.status === 404) {
      document.getElementById("loaderVerifyRegister").style.display = "none";
      document.getElementById("veryfyRegister").style.display = "block";
      document.getElementById("errorVarifyOtp").innerHTML = "OTP expired";
      document.getElementById("errorVarifyOtp").style.display = "block";
      document.getElementById("recentOTP").style.display = "block";
    }
  }

  return (
    <div
      className="bodyRegister"
      style={{ backgroundImage: `url('/registerBg.png')` }}
    >
      <div className="header__bodyRegister">
        <div className="header__left">
          <div>
            <img className="header__logo" src={logo} alt="Rone Logo" />
          </div>
        </div>
        <div className="header__right">
          <div className="header__menu__container">
            <img src={menu} alt="" />
          </div>
        </div>
      </div>
      <div className="content__bodyRegister">
        <div className="image__container__bodyRegister">
          <img src={register} alt="" />
        </div>
        <div className="inputs__container__bodyRegister">
          <h2>Verify OTP</h2>
          <p style={{ fontSize: "13px", marginTop: "10px" }}>
            enter OTP from email
          </p>
          <form className="form" action="">
            <fieldset className="input__container">
              <legend>Enter OTP*</legend>
              <div className="input__box">
                <input onChange={storeOtp} id="otp" type="text" />
              </div>
            </fieldset>
            <p id="errorVarifyOtp" className="error__varifyOtp">
              OTP *Required
            </p>
            <div onClick={handleSubmit} className="register__button__form">
              <div
                className="loader__container__login"
                id="loaderVerifyRegister"
              >
                <PulseLoader color="#ffffff" />
              </div>
              <p id="veryfyRegister">VERIFY EMAIL</p>
            </div>
          </form>
          <div className="alreadyRegistered__container" id="recentOTP">
            <a
              href="/"
              style={{ cursor: "pointer" }}
              className="alreadyRegisterd"
            >
              Resend OTP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
