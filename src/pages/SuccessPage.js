import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import "./SuccessPage.css";
import "../components/Header.css";
import logo from "../assets/Logo1.svg";
import successImg from "../assets/successimg.svg";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const SuccessPage = () => {
  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setId(pair[1]);
    }
  }
  useEffect(() => {
    getParameters();
    async function createRoneId() {
      let endpoint = "https://ronenestjs.herokuapp.com/new_user/create_id";
      let url = new URL(endpoint);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Id,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        setEmail(data.email);
        document.getElementById("responseLoader").style.display = "none";
        document.getElementById("emailsentLink").style.display = "block";
      }
      if (data.status === 406) {
        document.getElementById("responseLoader").style.display = "none";
        document.getElementById("emailsentLink").innerHTML = data.error;
        document.getElementById("emailsentLink").style.display = "block";
        document.getElementById("emailsentLink").style.color = "#d52a33";
      }
    }

    if (Id !== "") {
      createRoneId();
    } else {
      console.log("not found email");
    }
  }, [Id]);

  return (
    <div className="successPage">
      <div className="header" style={{ height: "80px" }}>
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="Rone-logo" />
          </a>
        </div>
        <div className="header__right__main">
          <Link to="/" className="buttonContainer">
            <PrimaryButton content="Register" />
          </Link>
        </div>
      </div>
      <div className="successPageContainer">
        <p className="paymnetSuccessText">
          your payment was successful <br /> check your mail for <br />
          confirmation
        </p>
        <div id="responseLoader">
          <PropagateLoader color="red" />
        </div>

        <p id="emailsentLink" className="emailSent">
          Your rONE ID sended to <br />
          <span
            style={{ color: "blueviolet", marginTop: "20px", fontSize: "14px" }}
          >
            {email}
          </span>
        </p>
        <img src={successImg} alt="" />
      </div>
    </div>
  );
};

export default SuccessPage;
