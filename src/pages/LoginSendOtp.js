import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import SecondaryButton from "../components/SecondaryButton";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const LoginSendOtp = () => {
  const [isdetails, setIsdetails] = useState(false);
  const [loginNumber, setLoginNumber] = useState("");
  const [roneId, setRoneId] = useState("");

  async function checkUser() {
    document.getElementById("loaderSentOtp").style.display = "block";
    document.getElementById("sentOTP").style.display = "none";
    let url = new URL("https://ronenestjs.herokuapp.com/auth/login");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentials: {
          roneId: roneId,
          contact: loginNumber,
        },
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      window.onbeforeunload = function (e) {
        window.onunload = function () {
          window.localStorage.isMySessionActive = "false";
        };
        return undefined;
      };
      window.onload = function () {
        window.localStorage.isMySessionActive = "true";
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("roneid", roneId);
      window.location.href = "/verifyotplogin";
    } else if (data.status === 401) {
      document.getElementById("loaderSentOtp").style.display = "none";
      document.getElementById("sentOTP").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML = data.error;
    } else {
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML = "error occured";
      document.getElementById("loaderSentOtp").style.display = "none";
      document.getElementById("sentOTP").style.display = "block";
    }
  }

  const storeMobile = () => {
    setLoginNumber(document.getElementById("number").value);
    setRoneId(document.getElementById("roneId").value);
  };

  useEffect(() => {
    if (loginNumber !== "") {
      let isnum = /^\d+$/.test(loginNumber);
      if (loginNumber.length !== 0) {
        if (isnum) {
          setIsdetails(true);
        } else {
          setIsdetails(false);
        }
        if (roneId !== "") {
          setIsdetails(true);
        }
      } else {
        setIsdetails(false);
      }
    }
  }, [loginNumber, roneId]);

  const loginClick = () => {
    if (loginNumber === "" || roneId === "") {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Must fill *Required fields";
    } else {
      let isnum = /^\d+$/.test(loginNumber);
      if (loginNumber.length !== 0) {
        if (isnum) {
          document.getElementById("errorMobile").style.display = "none";
        } else {
          document.getElementById("errorMobile").style.display = "block";
          document.getElementById("errorMobile").innerHTML =
            "Enter a valid Mobile Number";
        }
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Mobile Number";
      }
      if (isdetails) {
        checkUser();
      }
    }
  };

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
          <Link to="/">
            <SecondaryButton content="Register" />
          </Link>
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
          <h2>Login</h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>rONE ID*</legend>
              <div className="input__box">
                <input onChange={storeMobile} id="roneId" type="text" />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Mobile Number*</legend>
              <div className="input__box">
                <input onChange={storeMobile} id="number" type="text" />
              </div>
            </fieldset>
            <p id="errorMobile" className="error__varifyOtp">
              Enter a valid Mobile Number
            </p>
            <div onClick={loginClick} className="register__button__form">
              <div className="loader__container__login" id="loaderSentOtp">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="sentOTP">SENT OTP TO MOBILE</p>
            </div>
          </form>
          <div className="alreadyRegistered__container">
            <p className="alreadyRegisterd">Not registered ? </p>
            <Link to="/">
              <p className="login__AlreadyRegisterd">Register</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSendOtp;
