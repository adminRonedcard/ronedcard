import React, { useState } from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import "./HomePage.css";

const HomePage = () => {
  const [roneId, setRoneId] = useState("");
  const [email, setEmail] = useState("");

  const storeValue = () => {
    setRoneId(document.getElementById("roneId").value);
    setEmail(document.getElementById("email").value);
  };

  async function verifyContact() {
    document.getElementById("loaderNextButton").style.display = "block";
    document.getElementById("nextText").style.display = "none";
    let url = new URL("https://ronenestjs.herokuapp.com/auth/register");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roneId: roneId,
        email: email,
      }),
    });
    const data = await res.json();
    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      document.getElementById("loaderNextButton").style.display = "none";
      document.getElementById("nextText").style.display = "block";
      localStorage.setItem("roneid", roneId);
      window.location.href = "/register";
    } else if (data.status === 401) {
      document.getElementById("nextText").style.display = "block";
      document.getElementById("errorRoneId").style.display = "block";
      document.getElementById("errorRoneId").innerHTML =
        "invalid rONE ID or Email";
      document.getElementById("loaderNextButton").style.display = "none";
      document.getElementById("nextText").style.display = "block";
    }
  }
  const nextClick = () => {
    if (roneId === "" || email === "") {
      document.getElementById("errorRoneId").style.display = "block";
    } else {
      document.getElementById("errorRoneId").style.display = "none";
      verifyContact();
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
          <Link className="loginButton__container" to="/login">
            <PrimaryButton content="Login" />
          </Link>
          <div className="header__menu__container">
            <img src={menu} alt="" />
          </div>
        </div>
      </div>
      <div className="content__homePage">
        <div className="image__container__bodyRegister">
          <img src={register} alt="" />
        </div>
        <div className="inputs__container__bodyRegister">
          <h2>Register</h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>rONE ID*</legend>
              <div className="input__box">
                <input onChange={storeValue} id="roneId" type="text" />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Email*</legend>
              <div className="input__box">
                <input onChange={storeValue} id="email" type="email" />
              </div>
            </fieldset>
            <p className="errorText" id="errorRoneId">
              Must fill *Required fields
            </p>
            <div
              id="nextButton"
              className="register__button__form"
              onClick={nextClick}
            >
              <div className="loader__container__login" id="loaderNextButton">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="nextText">NEXT</p>
            </div>
          </form>
          <div
            className="alreadyRegistered__container"
            id="alreadyRegisterdLogin"
          >
            <p className="alreadyRegisterd">Already Registered ? </p>
            <Link to="/login">
              <p className="login__AlreadyRegisterd">Login</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="FooterLinks__home">
        <div className="callCustomerCare" id="alreadyRegisterdLogin">
          <p className="callUs">Email and rONE ID doesn't match?</p>
          <p>
            Call Us :
            <a href="tel:9298300300" className="callNumber">
              {" "}
              +91 9298 300 300
            </a>
          </p>
        </div>
        <div className="top__footerLinks__home">
          <ul>
            <li>
              <a href="/link/about">About</a>
            </li>
            <li>
              <a href="/link/terms-and-conditions">Terms & Conditions</a>
            </li>
            <li>
              <a href="/link/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="bottom__footerLinks__home">
          <ul>
            <li>
              <a href="/link/disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="/link/cookie-policy">Cookie Policy</a>
            </li>
            <li>
              <a href="/link/refund-policy">Refund Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
