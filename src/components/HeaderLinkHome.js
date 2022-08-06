import React from "react";
import "./Header.css";
import logo from "../assets/Logo1.svg";
import PrimaryButton from "./PrimaryButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer" id="headerContainer">
      <div className="header">
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="Rone-logo" />
          </a>
        </div>
        <div className="header__right__main">
          <Link
            to="/"
            className="buttonContainer"
            style={{ marginRight: "8vw" }}
          >
            <PrimaryButton content="Register" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
