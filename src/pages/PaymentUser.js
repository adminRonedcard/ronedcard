/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import PrimaryButton from "../components/PrimaryButton";
import "./PaymentUser.css";
import "../components/Header.css";
import "./AuthStyles.css";
import "./UserDetails.css";
import useRazorpay from "react-razorpay";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { PulseLoader } from "react-spinners";

const PaymentUser = () => {
  const Razorpay = useRazorpay();

  const [id, setId] = useState("");

  const [name, setname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [orderId, setOrderId] = useState("");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("/")[3];
    if (paramString) {
      setId(paramString);
    }
  }

  useEffect(() => {
    getParameters();
    async function getUserdata() {
      let url = new URL(
        "https://ronenestjs.herokuapp.com/payments/create_Order"
      );
      url.search = new URLSearchParams({
        Id: id,
      });
      axios.get(url).then((response) => {
        if (response.data.status === 200) {
          setname(response.data.userData.name);
          setEmail(response.data.userData.email);
          setNumber(response.data.userData.phone);
          setOrderId(response.data.orderId);
          document.getElementById("containerPaymnetUser").style.display =
            "flex";
          document.getElementById("loaderPaymnetUser").style.display = "none";
        }
      });
    }
    if (id !== undefined && id !== "") {
      getUserdata();
    }
  }, [id]);

  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_RVRFuJkkOrYw1Y",
      amount: "1500",
      currency: "INR",
      name: "Rone Payment",
      description: "",
      image: logo,
      order_id: orderId,
      callback_url: "https://ronenestjs.herokuapp.com/payments/verify_payment",
      redirect: true,
      handler: (res) => {},
      prefill: {
        name: `${name}`,
        email: `${email}`,
        contact: `${number}`,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#d52a33",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, name, email, number, orderId]);

  async function cashOnDelivery() {
    document.getElementById("loadercashOndelivery").style.display = "block";
    document.getElementById("sentcod").style.display = "none";

    let url = "https://data-totality-351315.uc.r.appspot.com/cashOnDelivery";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        phone: number,
        email: email,
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      window.location.href = `https://ronedcard.com/success-payment/paymentSuccess?id=${data.paymentId}`;
    }
    if (data.status === 500) {
      document.getElementById("loaderSentOtp").style.display = "block";
      document.getElementById("sentOTP").style.display = "none";
    }
  }

  return (
    <div className="paymnetUser" style={{ height: "80px" }}>
      <div className="header">
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
      <div className="container__paymnetUser" id="containerPaymnetUser">
        <h2>rONE Payment</h2>
        <form action="" autoComplete="off" className="form">
          <fieldset className="input__container">
            <legend>Name</legend>
            <div className="input__box">
              <input readOnly type="text" name="username" value={name} />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Mobile Number</legend>
            <div className="input__box">
              <input readOnly type="tel" name="mobile" value={number} />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Email</legend>
            <div className="input__box">
              <input
                readOnly
                id="email"
                type="email"
                name="email"
                value={email}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Price</legend>
            <div className="input__box">
              <input
                readOnly
                id="price"
                type="text"
                name="price"
                value="₹ 1500 + Fee*"
              />
            </div>
          </fieldset>
          <p style={{ fontSize: "12px", color: "#686868" }}>
            *A convenience fee will be charged depending on your choice of
            payment method.
          </p>
          <div onClick={handlePayment} className="saveProfileButton">
            <div className="loader__container__login"></div>
            <p>PAY WITH RAZORPAY</p>
          </div>
          <div onClick={cashOnDelivery} className="saveProfileButton">
            <div className="loader__container__cod" id="loadercashOndelivery">
              <PulseLoader color="#ffffff" />
            </div>
            <p id="sentcod">CASH ON DELIVERY</p>
          </div>
        </form>
      </div>
      <div className="loader__container__paymnetUser" id="loaderPaymnetUser">
        <GridLoader size={25} margin={2} color="#d52a33" />
      </div>
    </div>
  );
};

export default PaymentUser;
