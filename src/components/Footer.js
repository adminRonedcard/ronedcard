import React from "react";
import "./Footer.css";
import logo from "../assets/Logo1.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left__footer__container">
        <div className="logo__footer">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="right__footer__container">
        <div className="left__footerLinks__container LinksContainer__footer">
          <h4>What we provide</h4>
          <ul>
            <li>
              <span>
                <a href="/profile">Home</a>
              </span>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
            <li>
              <a href="/login">login</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#imageGallery">Image Gallery</a>
            </li>
          </ul>
        </div>
        <div className="leftCenter__footerLinks__container LinksContainer__footer">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">logout</a>
            </li>
            <li>
              <a href="/settings/profile">Profile Settings</a>
            </li>
            <li>
              <a href="/settings/account">Account Settings</a>
            </li>
            <li>
              <a href="/settings/Wallet">Wallet</a>
            </li>
            <li>
              <a href="/settings/QR-code">QR Code</a>
            </li>
          </ul>
        </div>
        <div className="rightCenter__footerLinks__container LinksContainer__footer">
          <h4>Rone Policies</h4>
          <ul>
            <li>
              <a href="/disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="/terms-and-conditions">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/cookie-policy">Cookie Policy</a>
            </li>
            <li>
              <a href="/refund-policy">Refund Policy</a>
            </li>
          </ul>
        </div>
        <div className="right__footerLinks__container LinksContainer__footer">
          <h4>What Rone provides</h4>
          <ul>
            <li>
              <a href="/settings/Wallet">Rone Card</a>
            </li>
            <li>
              <a href="https://www.roneinfotrade.org/">Buy Rone Card</a>
            </li>
            <li>
              <a href="/settings/QR-code">Scan QR</a>
            </li>
            <li>
              <a href="/settings/Wallet">Transaction history</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
